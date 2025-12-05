class Stepper {
    constructor(formSelector) {
        this.form = document.querySelector(formSelector);
        if (!this.form) return;

        this.steps = Array.from(this.form.querySelectorAll('.step-section'));
        this.indicatorsContainer = this.form.querySelector('.step-indicators');
        this.prevBtn = this.form.querySelector('.btn-prev');
        this.nextBtn = this.form.querySelector('.btn-next');
        this.submitBtn = this.form.querySelector('.btn-submit');

        // Retrieve current step from localStorage
        this.currentStep = parseInt(localStorage.getItem('stepperCurrentStep') || '0', 10);
        this.totalSteps = this.steps.length;

        // Restore form data from localStorage
        this.restoreFormData();
        this.init();
    }

    // Save form data to localStorage
    saveFormData() {
        const data = {};
        this.form.querySelectorAll('input, select, textarea').forEach(input => {
            if (input.type === 'checkbox' || input.type === 'radio') {
                data[input.name] = input.checked;
            } else {
                data[input.name] = input.value;
            }
        });
        localStorage.setItem('stepperFormData', JSON.stringify(data));
    }

    // Restore form data from localStorage
    restoreFormData() {
        const data = JSON.parse(localStorage.getItem('stepperFormData') || '{}');
        this.form.querySelectorAll('input, select, textarea').forEach(input => {
            if (data.hasOwnProperty(input.name)) {
                if (input.type === 'checkbox' || input.type === 'radio') {
                    input.checked = data[input.name];
                } else {
                    input.value = data[input.name];
                }
            }
        });
    }

    init() {
        this.renderIndicators();
        this.showStep(this.currentStep);
        this.addEventListeners();
    }

    renderIndicators() {
        if (!this.indicatorsContainer) return;
        
        this.indicatorsContainer.innerHTML = '';
        this.steps.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.classList.add('step-indicator');
            if (index === 0) indicator.classList.add('active');

            const inner = document.createElement('div');
            inner.classList.add('step-indicator-inner');
            inner.textContent = index + 1;

            indicator.appendChild(inner);
            this.indicatorsContainer.appendChild(indicator);

            if (index < this.totalSteps - 1) {
                const connector = document.createElement('div');
                connector.classList.add('step-connector');
                const line = document.createElement('div');
                line.classList.add('step-connector-line');
                connector.appendChild(line);
                this.indicatorsContainer.appendChild(connector);
            }
        });
    }

    updateIndicators(stepIndex) {
        const indicators = this.indicatorsContainer.querySelectorAll('.step-indicator');
        const connectors = this.indicatorsContainer.querySelectorAll('.step-connector-line');

        indicators.forEach((indicator, index) => {
            indicator.classList.remove('active', 'completed');
            const inner = indicator.querySelector('.step-indicator-inner');
            inner.innerHTML = index + 1;

            if (index === stepIndex) {
                indicator.classList.add('active');
            } else if (index < stepIndex) {
                indicator.classList.add('completed');
                inner.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
            }
        });

        connectors.forEach((line, index) => {
            if (index < stepIndex) {
                line.classList.add('filled');
            } else {
                line.classList.remove('filled');
            }
        });
    }

    showStep(index, direction = 'next') {
        this.steps.forEach((step, i) => {
            step.classList.remove('active', 'slide-in-right', 'slide-in-left');
            if (i === index) {
                step.classList.add('active');
                step.classList.add(direction === 'next' ? 'slide-in-right' : 'slide-in-left');
            }
        });

        this.updateIndicators(index);
        this.updateButtons(index);
        this.currentStep = index;
        localStorage.setItem('stepperCurrentStep', index);
    }

    updateButtons(index) {
        // Prev Button
        if (this.prevBtn) {
            this.prevBtn.style.display = index === 0 ? 'none' : 'inline-flex';
        }

        // Next/Submit Button
        if (index === this.totalSteps - 1) {
            if (this.nextBtn) this.nextBtn.style.display = 'none';
            if (this.submitBtn) this.submitBtn.style.display = 'inline-flex';
        } else {
            if (this.nextBtn) this.nextBtn.style.display = 'inline-flex';
            if (this.submitBtn) this.submitBtn.style.display = 'none';
        }
    }

    validateStep(index) {
        const currentStepEl = this.steps[index];
        const inputs = currentStepEl.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;

        inputs.forEach(input => {
            // Remove old error message
            let errorMsg = input.parentElement.querySelector('.error-message');
            if (errorMsg) errorMsg.remove();
            input.classList.remove('input-error');

            if (!input.checkValidity()) {
                isValid = false;
                input.classList.add('input-error');
                // Create new error message
                errorMsg = document.createElement('div');
                errorMsg.className = 'error-message';
                errorMsg.textContent = input.validationMessage;
                input.parentElement.appendChild(errorMsg);
            }
        });

        return isValid;
    }

    addEventListeners() {
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (this.validateStep(this.currentStep)) {
                    this.showStep(this.currentStep + 1, 'next');
                }
            });
        }

        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showStep(this.currentStep - 1, 'prev');
            });
        }

        // Save form data on any change
        this.form.addEventListener('input', (e) => {
            const input = e.target;
            if (input.matches('input, textarea, select')) {
                if (input.checkValidity()) {
                    input.classList.remove('input-error');
                    let errorMsg = input.parentElement.querySelector('.error-message');
                    if (errorMsg) errorMsg.remove();
                }
                this.saveFormData();
            }
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Stepper('.contact-form');
});
