const i18n = {
  en: {
    full_name_label: 'Full name',
    national_id_label: 'National ID number',
    phone_label: 'Phone number',
    email_label: 'Email address',
    dob_label: 'Date of birth',
    city_label: 'City',
    password_label: 'Password',
    submit: 'Create account',
    fineprint: 'By continuing, you agree to our Terms and Privacy Policy.',
    lang_en: 'EN',
    lang_ar: 'AR',
    placeholders: {
      fullName: 'John Doe',
      nationalId: '1234567890',
      phone: '+1 555 123 4567',
      email: 'name@example.com',
      city: 'Riyadh',
      password: '••••••••'
    },
    brand: 'SPED OF MASTERY'
  },
  ar: {
    full_name_label: 'الاسم الكامل',
    national_id_label: 'رقم الهوية الوطنية',
    phone_label: 'رقم الجوال',
    email_label: 'البريد الإلكتروني',
    dob_label: 'تاريخ الميلاد',
    city_label: 'المدينة',
    password_label: 'كلمة المرور',
    submit: 'إنشاء حساب',
    fineprint: 'بمتابعتك، فإنك توافق على الشروط وسياسة الخصوصية.',
    lang_en: 'إنج',
    lang_ar: 'عرب',
    placeholders: {
      fullName: 'محمد علي',
      nationalId: '١٢٣٤٥٦٧٨٩٠',
      phone: '+966 5x xxx xxxx',
      email: 'name@example.com',
      city: 'الرياض',
      password: '••••••••'
    },
    brand: 'سرعة الإتقان'
  }
};

const state = {
  lang: 'en'
};

function setLanguage(lang) {
  state.lang = lang;
  const dict = i18n[lang];

  // Toggle dir for RTL
  const html = document.documentElement;
  html.setAttribute('lang', lang);
  html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

  // Update heading
  const title = document.querySelector('.brand-title');
  if (title) title.textContent = dict.brand;

  // Update text nodes with data-i18n keys
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (key in dict && typeof dict[key] === 'string') {
      el.textContent = dict[key];
    }
  });

  // Update placeholders by input name
  const form = document.querySelector('form');
  if (form) {
    const map = dict.placeholders;
    ['fullName', 'nationalId', 'phone', 'email', 'city', 'password'].forEach((name) => {
      const input = form.querySelector(`[name="${name}"]`);
      if (input && map[name]) input.setAttribute('placeholder', map[name]);
    });
  }

  document.title = (lang === 'ar' ? 'التسجيل' : 'Sign Up') + ' • ' + dict.brand;
}

function init() {
  const toggle = document.getElementById('langToggle');
  if (toggle) {
    toggle.addEventListener('change', () => {
      setLanguage(toggle.checked ? 'ar' : 'en');
    });
  }

  // Default language English
  setLanguage('en');

  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = Object.fromEntries(new FormData(form).entries());
      // Placeholder: For now, log values; integrate backend later
      console.log('Signup submit', formData);
      alert(state.lang === 'ar' ? 'تم حفظ البيانات (عرض تجريبي فقط)' : 'Data captured (demo only)');
    });
  }
}

window.addEventListener('DOMContentLoaded', init);