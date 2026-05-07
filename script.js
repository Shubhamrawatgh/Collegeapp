document.addEventListener('DOMContentLoaded', () => {
    // === DOM Elements ===
    const htmlElement = document.documentElement;
    const themeToggleBtn = document.getElementById('themeToggle');
    
    const sidebar = document.getElementById('sidebar');
    const openSidebarBtn = document.getElementById('openSidebar');
    const mobileOverlay = document.getElementById('mobileOverlay');
    
    const navItems = document.querySelectorAll('.os-nav .nav-item:not(.external)');
    const views = document.querySelectorAll('.view');
    
    // === Theme Management ===
    const savedTheme = localStorage.getItem('os-theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    function toggleTheme() {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('os-theme', newTheme);
        updateThemeIcon(newTheme);
    }

    function updateThemeIcon(theme) {
        if (!themeToggleBtn) return;
        const icon = themeToggleBtn.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'ph ph-sun';
        } else {
            icon.className = 'ph ph-moon';
        }
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }

    // === Mobile Sidebar ===
    function openSidebar() {
        sidebar.classList.add('open');
        mobileOverlay.classList.add('active');
    }
    
    function closeSidebar() {
        sidebar.classList.remove('open');
        mobileOverlay.classList.remove('active');
    }

    if (openSidebarBtn) openSidebarBtn.addEventListener('click', openSidebar);
    if (mobileOverlay) mobileOverlay.addEventListener('click', closeSidebar);

    // === SPA View Switching ===
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Update Active State on Nav
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            
            // Get Target View
            const targetId = item.getAttribute('data-target');
            if(!targetId) return;
            
            // Hide all views, show target
            views.forEach(view => view.classList.remove('active'));
            const targetView = document.getElementById(targetId);
            if (targetView) targetView.classList.add('active');
            
            // Update Breadcrumb text
            const breadcrumbCurrent = document.querySelector('.breadcrumb .current');
            if (breadcrumbCurrent) {
                breadcrumbCurrent.textContent = item.querySelector('span').textContent;
            }

            // Close mobile sidebar if open
            if (window.innerWidth <= 768) {
                closeSidebar();
            }
        });
    });

    // === Semester Chip Logic ===
    const chips = document.querySelectorAll('.semester-chips .chip');
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            chips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            // Mock refreshing data...
            document.querySelector('.overall-stat').textContent = 'Loading...';
            setTimeout(() => {
                document.querySelector('.overall-stat').textContent = '82% Overall';
                generateHeatmap(); // regenerate with random data to simulate change
            }, 600);
        });
    });

    // === Generate Attendance Heatmap ===
    const heatmapContainer = document.getElementById('heatmapContainer');
    
    function generateHeatmap() {
        if (!heatmapContainer) return;
        heatmapContainer.innerHTML = ''; // clear existing
        
        // Let's generate about 14 weeks * 5 days = 70 days of mock attendance
        const totalDays = 70;
        
        for (let i = 0; i < totalDays; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            
            // Randomly assign attendance level 0 to 4
            // Bias towards higher attendance (students usually attend!)
            const rand = Math.random();
            let level = 0;
            if (rand > 0.9) level = 0; // Missed all classes
            else if (rand > 0.8) level = 1; // Attended few
            else if (rand > 0.6) level = 2; // Attended some
            else if (rand > 0.3) level = 3; // Attended most
            else level = 4; // Attended all
            
            cell.classList.add(`level-${level}`);
            
            // Add a simple tooltip title
            cell.title = `Day ${i + 1}: Level ${level}`;
            
            heatmapContainer.appendChild(cell);
        }
    }
    
    // Initial generation
    generateHeatmap();

    // === Carousel Controls ===
    const carousel = document.getElementById('eventsCarousel');
    const btnPrev = document.getElementById('car-prev');
    const btnNext = document.getElementById('car-next');

    if (carousel && btnPrev && btnNext) {
        btnNext.addEventListener('click', () => {
            carousel.scrollBy({ left: 260, behavior: 'smooth' });
        });
        
        btnPrev.addEventListener('click', () => {
            carousel.scrollBy({ left: -260, behavior: 'smooth' });
        });
    }
});
