class ClickSpark extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.sparks = [];
        this.startTime = null;
        this.animationId = null;
        this.resizeTimeout = null;
    }

    static get observedAttributes() {
        return [
            "spark-color",
            "spark-size",
            "spark-radius",
            "spark-count",
            "duration",
            "easing",
            "extra-scale",
        ];
    }

    get config() {
        return {
            sparkColor: this.getAttribute("spark-color") || "#D8C49E",
            sparkSize: parseFloat(this.getAttribute("spark-size")) || 10,
            sparkRadius: parseFloat(this.getAttribute("spark-radius")) || 15,
            sparkCount: parseInt(this.getAttribute("spark-count")) || 8,
            duration: parseFloat(this.getAttribute("duration")) || 400,
            easing: this.getAttribute("easing") || "ease-out",
            extraScale: parseFloat(this.getAttribute("extra-scale")) || 1.0,
        };
    }

    connectedCallback() {
        this.render();
        this.canvas = this.shadowRoot.querySelector("canvas");
        this.ctx = this.canvas.getContext("2d");

        this.setupResizeObserver();
        this.addEventListeners();
        this.startAnimation();
    }

    disconnectedCallback() {
        if (this.resizeTimeout) clearTimeout(this.resizeTimeout);
        if (this.animationId) cancelAnimationFrame(this.animationId);
        this.removeEventListeners();
        window.removeEventListener("resize", this.handleResizeBound);
    }

    attributeChangedCallback() {}

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    pointer-events: none;
                    z-index: 9999;
                }
                canvas {
                    width: 100%;
                    height: 100%;
                    display: block;
                }
            </style>
            <canvas></canvas>
        `;
    }

    setupResizeObserver() {
        this.handleResizeBound = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            this.canvas.width = width;
            this.canvas.height = height;
        };

        window.addEventListener("resize", this.handleResizeBound);
        this.handleResizeBound();
    }

    addEventListeners() {
        this.handleClickBound = this.handleClick.bind(this);
        document.addEventListener("click", this.handleClickBound);
    }

    removeEventListeners() {
        document.removeEventListener("click", this.handleClickBound);
    }

    easeFunc(t) {
        const { easing } = this.config;
        switch (easing) {
            case "linear":
                return t;
            case "ease-in":
                return t * t;
            case "ease-in-out":
                return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
            default: // ease-out
                return t * (2 - t);
        }
    }

    handleClick(e) {
        const x = e.clientX;
        const y = e.clientY;
        const now = performance.now();
        const { sparkCount } = this.config;

        const newSparks = Array.from({ length: sparkCount }, (_, i) => ({
            x,
            y,
            angle: (2 * Math.PI * i) / sparkCount,
            startTime: now,
        }));

        this.sparks.push(...newSparks);
    }

    startAnimation() {
        const draw = (timestamp) => {
            if (!this.startTime) this.startTime = timestamp;
            const { duration, sparkRadius, extraScale, sparkSize, sparkColor } = this.config;

            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            this.sparks = this.sparks.filter((spark) => {
                const elapsed = timestamp - spark.startTime;
                if (elapsed >= duration) return false;

                const progress = elapsed / duration;
                const eased = this.easeFunc(progress);

                const distance = eased * sparkRadius * extraScale;
                const lineLength = sparkSize * (1 - eased);

                const x1 = spark.x + distance * Math.cos(spark.angle);
                const y1 = spark.y + distance * Math.sin(spark.angle);
                const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
                const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

                this.ctx.strokeStyle = sparkColor;
                this.ctx.lineWidth = 2;
                this.ctx.beginPath();
                this.ctx.moveTo(x1, y1);
                this.ctx.lineTo(x2, y2);
                this.ctx.stroke();

                return true;
            });

            this.animationId = requestAnimationFrame(draw);
        };

        this.animationId = requestAnimationFrame(draw);
    }
}

customElements.define("click-spark", ClickSpark);
