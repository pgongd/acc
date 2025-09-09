class Dialog {
  constructor(element, options = {}) {
    this.dialogElement = element;
    this.openBtn = options.openBtn;
    this.closeBtn = this.dialogElement.querySelector('.dialog__close-btn');

    this.previouslyFocusedElement = null;
    this.focusableElements = [];

    this._addEventListeners();
  }

  _addEventListeners() {
    if (this.openBtn) {
      this.openBtn.addEventListener('click', () => this.open());
    }
    this.closeBtn.addEventListener('click', () => this.close());
    document.addEventListener('keydown', this._handleKeyDown.bind(this));
  }

  open() {
    this.previouslyFocusedElement = document.activeElement;
    this.dialogElement.classList.add('dialog--is-open');
    document.body.classList.add('body--no-scroll'); // <body>에 클래스 추가하여 스크롤 막기
    this._trapFocus();
    this.closeBtn.focus();
  }

  close() {
    this.dialogElement.classList.remove('dialog--is-open');
    document.body.classList.remove('body--no-scroll'); // <body>에서 클래스 제거
    if (this.previouslyFocusedElement) {
      this.previouslyFocusedElement.focus();
    }
  }

  _trapFocus() {
    const focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    this.focusableElements = Array.from(this.dialogElement.querySelectorAll(focusableSelectors));

    this.firstFocusableElement = this.focusableElements[0];
    this.lastFocusableElement = this.focusableElements[this.focusableElements.length - 1];
  }

  _handleKeyDown(event) {
    if (!this.dialogElement.classList.contains('dialog--is-open')) return;

    if (event.key === 'Escape') {
      this.close();
      return;
    }

    if (event.key === 'Tab') {
      const isFirstElementFocused = document.activeElement === this.firstFocusableElement;
      const isLastElementFocused = document.activeElement === this.lastFocusableElement;

      if (event.shiftKey) { // Shift + Tab (역방향)
        if (isFirstElementFocused) {
          this.lastFocusableElement.focus();
          event.preventDefault();
        }
      } else { // Tab (정방향)
        if (isLastElementFocused) {
          this.firstFocusableElement.focus();
          event.preventDefault();
        }
      }
    }
  }
}