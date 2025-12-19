// Simple Toast Notification System
class Toast {
  constructor() {
    this.container = document.getElementById('toast-container');
    this.toasts = [];
  }

  show(message, type = 'success', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    this.container.appendChild(toast);
    this.toasts.push(toast);

    setTimeout(() => {
      toast.classList.add('removing');
      setTimeout(() => {
        toast.remove();
        this.toasts = this.toasts.filter(t => t !== toast);
      }, 300);
    }, duration);
  }

  success(message) {
    this.show(message, 'success');
  }

  error(message) {
    this.show(message, 'error');
  }
}

const toast = new Toast();

// Form State Management
const formState = {
  name: '',
  email: '',
  message: '',
  isSubmitting: false
};

// Handle Header Mobile Menu
function initHeader() {
  const menuButton = document.querySelector('[data-mobile-menu-toggle]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');

  if (menuButton && mobileMenu) {
    menuButton.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('hidden');
      if (isOpen) {
        mobileMenu.classList.remove('hidden');
      } else {
        mobileMenu.classList.add('hidden');
      }
    });

    // Close menu when a nav link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }
}

// Handle Form Submission
function initContactForm() {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;

  const nameInput = form.querySelector('[name="name"]');
  const emailInput = form.querySelector('[name="email"]');
  const messageInput = form.querySelector('[name="message"]');
  const submitBtn = form.querySelector('[type="submit"]');

  // Track form state
  nameInput.addEventListener('change', (e) => {
    formState.name = e.target.value;
  });

  emailInput.addEventListener('change', (e) => {
    formState.email = e.target.value;
  });

  messageInput.addEventListener('change', (e) => {
    formState.message = e.target.value;
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!formState.name || !formState.email || !formState.message) {
      toast.error('Please fill in all fields');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formState.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    formState.isSubmitting = true;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    try {
      // Simulate form submission - in production, replace with actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Log the form data (in production, send to backend API)
      console.log('Form submitted:', formState);
      
      toast.success('Thank you! We\'ll get back to you soon.');
      form.reset();
      nameInput.value = '';
      emailInput.value = '';
      messageInput.value = '';
      formState.name = '';
      formState.email = '';
      formState.message = '';
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      formState.isSubmitting = false;
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    }
  });
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initContactForm();
});
