// ==========================================================================
// Alfacomp Code Landing Page — Interactive Scripts
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Tab Switching in IDE Window
  const tabs = document.querySelectorAll('.ide-tabs .tab');
  const tabContents = {
    python: document.getElementById('tabContentPython'),
    html: document.getElementById('tabContentHtml'),
    gemini: document.getElementById('tabContentGemini')
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');

      // Update active tab button
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Update active tab content
      Object.values(tabContents).forEach(content => {
        if (content) content.classList.remove('active');
      });

      if (tabContents[target]) {
        tabContents[target].classList.add('active');
      }
    });
  });

  // 2. Tab Key / Button Autocomplete Simulator (Python Car Class)
  const ghostCode = document.getElementById('ghostCode');
  const acceptTabBtn = document.getElementById('acceptTabBtn');
  const tabHelper = document.getElementById('tabHelper');

  function acceptGhostText() {
    if (ghostCode) {
      ghostCode.classList.add('accepted');
      if (tabHelper) {
        tabHelper.innerHTML = '<span style="color:#34d399;font-weight:600;">✅ Код принят по Tab!</span>';
        setTimeout(() => {
          tabHelper.style.opacity = '0';
          setTimeout(() => tabHelper.style.display = 'none', 300);
        }, 2000);
      }
    }
  }

  if (acceptTabBtn) {
    acceptTabBtn.addEventListener('click', acceptGhostText);
  }

  // Also listen for real Tab key when user is exploring the demo
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Tab' && document.getElementById('tabContentPython')?.classList.contains('active')) {
      e.preventDefault();
      acceptGhostText();
    }
    // F5 runner shortcut in demo
    if (e.key === 'F5') {
      e.preventDefault();
      triggerTerminalRun();
    }
  });

  // 3. Run Button (F5) & Terminal Drawer
  const runButton = document.getElementById('runButton');
  const terminalDrawer = document.getElementById('terminalDrawer');
  const closeTermBtn = document.getElementById('closeTermBtn');

  function triggerTerminalRun() {
    // If not in python tab, switch to python tab first to show output
    const pyTab = document.querySelector('.tab[data-tab="python"]');
    if (pyTab && !pyTab.classList.contains('active')) {
      pyTab.click();
    }

    if (terminalDrawer) {
      terminalDrawer.classList.add('open');
    }
  }

  if (runButton) {
    runButton.addEventListener('click', triggerTerminalRun);
  }

  if (closeTermBtn) {
    closeTermBtn.addEventListener('click', () => {
      if (terminalDrawer) {
        terminalDrawer.classList.remove('open');
      }
    });
  }

  // 4. Gemini Button Shortcut in IDE Title
  const geminiButton = document.getElementById('geminiButton');
  if (geminiButton) {
    geminiButton.addEventListener('click', () => {
      const geminiTab = document.querySelector('.tab[data-tab="gemini"]');
      if (geminiTab) {
        geminiTab.click();
      }
    });
  }

  // 5. Interactive Real-time HTML Live Preview
  const htmlInputText = document.getElementById('htmlInputText');
  const htmlRenderOutput = document.getElementById('htmlRenderOutput');

  if (htmlInputText && htmlRenderOutput) {
    htmlInputText.addEventListener('input', () => {
      const text = htmlInputText.innerText.trim();
      htmlRenderOutput.textContent = text || 'Мой сайт';
    });
  }

  const browserMockBtn = document.getElementById('browserMockBtn');
  if (browserMockBtn) {
    browserMockBtn.addEventListener('click', () => {
      browserMockBtn.textContent = '🌐 Открыто в браузере!';
      browserMockBtn.style.color = '#34d399';
      setTimeout(() => {
        browserMockBtn.textContent = '🌐 Открыть в Chrome';
        browserMockBtn.style.color = '';
      }, 2500);
    });
  }

  // 6. Accordion for FAQ
  const accordionTriggers = document.querySelectorAll('.accordion-trigger');
  accordionTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.parentElement;
      const content = item.querySelector('.accordion-content');
      const isActive = item.classList.contains('active');

      // Close other accordion items
      document.querySelectorAll('.accordion-item').forEach(i => {
        i.classList.remove('active');
        const c = i.querySelector('.accordion-content');
        if (c) c.style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  // 7. Smooth Scroll for Navigation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
    });
  });
});
