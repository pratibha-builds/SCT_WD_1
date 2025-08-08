// SkillBridge - Professional JavaScript Functionality

// Application State
const AppState = {
    currentUserType: null,
    selectedSkills: [],
    registeredUsers: [],
    currentUser: null,
    matches: [],
    isLoading: false
};

// Available skills database - categorized for better organization
const skillsDatabase = {
    programming: [
        'JavaScript', 'Python', 'Java', 'C++', 'C#', 'PHP', 'Ruby', 'Go',
        'Rust', 'Swift', 'Kotlin', 'TypeScript', 'R', 'MATLAB', 'Scala'
    ],
    webDevelopment: [
        'HTML/CSS', 'React', 'Vue.js', 'Angular', 'Node.js', 'Express.js',
        'Django', 'Flask', 'Laravel', 'WordPress', 'Shopify', 'Next.js'
    ],
    dataScience: [
        'Data Science', 'Machine Learning', 'Deep Learning', 'Data Analysis',
        'Statistics', 'Pandas', 'NumPy', 'TensorFlow', 'PyTorch', 'Scikit-learn'
    ],
    design: [
        'UI/UX Design', 'Graphic Design', 'Web Design', 'Product Design',
        'Brand Design', 'Illustration', 'Animation', 'User Research'
    ],
    business: [
        'Project Management', 'Business Strategy', 'Marketing', 'Sales',
        'Leadership', 'Public Speaking', 'Negotiation', 'Entrepreneurship'
    ],
    tools: [
        'Figma', 'Adobe Creative Suite', 'Git', 'Docker', 'AWS', 'Azure',
        'Google Cloud', 'Tableau', 'Power BI', 'Excel', 'Slack', 'Jira'
    ]
};

// Flatten skills for easy access
const availableSkills = Object.values(skillsDatabase).flat();

// Mock data for demonstration
const mockProfessionals = [
    {
        id: 1,
        name: 'Sarah Johnson',
        title: 'Senior Software Engineer',
        company: 'Google',
        experience: '8+ years',
        skills: ['JavaScript', 'React', 'Node.js', 'Python'],
        bio: 'Passionate about mentoring junior developers and sharing knowledge about modern web technologies.',
        rating: 4.9,
        sessions: 127,
        location: 'San Francisco, CA'
    },
    {
        id: 2,
        name: 'Michael Chen',
        title: 'Data Scientist',
        company: 'Microsoft',
        experience: '6+ years',
        skills: ['Python', 'Machine Learning', 'Data Science', 'Statistics'],
        bio: 'Specialized in AI/ML with experience in building production-ready models.',
        rating: 4.8,
        sessions: 89,
        location: 'Seattle, WA'
    },
    {
        id: 3,
        name: 'Emily Rodriguez',
        title: 'UX Design Lead',
        company: 'Adobe',
        experience: '10+ years',
        skills: ['UI/UX Design', 'Figma', 'User Research', 'Product Design'],
        bio: 'Award-winning designer with expertise in creating user-centered digital experiences.',
        rating: 5.0,
        sessions: 156,
        location: 'Austin, TX'
    },
    {
        id: 4,
        name: 'David Kim',
        title: 'Product Manager',
        company: 'Amazon',
        experience: '7+ years',
        skills: ['Product Management', 'Business Strategy', 'Leadership', 'Project Management'],
        bio: 'Experienced in launching successful products and leading cross-functional teams.',
        rating: 4.7,
        sessions: 94,
        location: 'New York, NY'
    },
    {
        id: 5,
        name: 'Lisa Zhang',
        title: 'DevOps Engineer',
        company: 'Netflix',
        experience: '5+ years',
        skills: ['AWS', 'Docker', 'Git', 'Python', 'Linux'],
        bio: 'Expert in cloud infrastructure and automation, passionate about scalable systems.',
        rating: 4.8,
        sessions: 67,
        location: 'Los Angeles, CA'
    }
];

const mockStudents = [
    {
        id: 1,
        name: 'Alex Thompson',
        education: 'Computer Science Senior',
        university: 'Stanford University',
        goals: 'Land a software engineering job at a FAANG company',
        interestedSkills: ['JavaScript', 'React', 'System Design'],
        level: 'Intermediate'
    },
    {
        id: 2,
        name: 'Jessica Wang',
        education: 'Data Science Graduate',
        university: 'MIT',
        goals: 'Transition into AI research and development',
        interestedSkills: ['Machine Learning', 'Python', 'Deep Learning'],
        level: 'Advanced'
    },
    {
        id: 3,
        name: 'Carlos Rivera',
        education: 'Business Administration',
        university: 'Harvard Business School',
        goals: 'Start my own tech startup',
        interestedSkills: ['Entrepreneurship', 'Business Strategy', 'Leadership'],
        level: 'Beginner'
    },
    {
        id: 4,
        name: 'Aisha Patel',
        education: 'Design Student',
        university: 'RISD',
        goals: 'Become a product designer at a tech company',
        interestedSkills: ['UI/UX Design', 'Figma', 'User Research'],
        level: 'Intermediate'
    }
];

// Utility Functions
const Utils = {
    // Generate unique ID
    generateId: () => Date.now().toString(36) + Math.random().toString(36).substr(2),
    
    // Calculate match percentage
    calculateMatchScore: (userSkills, targetSkills) => {
        const commonSkills = userSkills.filter(skill => targetSkills.includes(skill));
        const maxSkills = Math.max(userSkills.length, targetSkills.length);
        return Math.min(Math.floor((commonSkills.length / maxSkills) * 100) + 
               Math.floor(Math.random() * 20), 100);
    },
    
    // Debounce function for search
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Format date
    formatDate: (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },
    
    // Smooth scroll to element
    scrollToElement: (elementId) => {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest'
            });
        }
    },
    
    // Show loading state
    showLoading: (element) => {
        element.classList.add('loading');
        if (element.tagName === 'BUTTON') {
            element.disabled = true;
            element.dataset.originalText = element.textContent;
            element.textContent = 'Loading...';
        }
    },
    
    // Hide loading state
    hideLoading: (element) => {
        element.classList.remove('loading');
        if (element.tagName === 'BUTTON') {
            element.disabled = false;
            if (element.dataset.originalText) {
                element.textContent = element.dataset.originalText;
                delete element.dataset.originalText;
            }
        }
    }
};

// Skill Management
const SkillManager = {
    // Initialize skill tags in a container
    initialize: (containerId) => {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.innerHTML = '';
        
        // Create categorized skill sections
        Object.entries(skillsDatabase).forEach(([category, skills]) => {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'skill-category';
            categoryDiv.innerHTML = `
                <h4 class="skill-category-title">${category.charAt(0).toUpperCase() + category.slice(1)}</h4>
                <div class="skill-category-tags"></div>
            `;
            
            const tagsContainer = categoryDiv.querySelector('.skill-category-tags');
            skills.forEach(skill => {
                const tag = document.createElement('span');
                tag.className = 'skill-tag';
                tag.textContent = skill;
                tag.setAttribute('data-skill', skill);
                tag.addEventListener('click', () => SkillManager.toggleSkill(skill, tag));
                tagsContainer.appendChild(tag);
            });
            
            container.appendChild(categoryDiv);
        });
    },
    
    // Toggle skill selection
    toggleSkill: (skill, element) => {
        const index = AppState.selectedSkills.indexOf(skill);
        
        if (index > -1) {
            AppState.selectedSkills.splice(index, 1);
            element.classList.remove('selected');
        } else {
            AppState.selectedSkills.push(skill);
            element.classList.add('selected');
        }
        
        // Update UI to show selected count
        SkillManager.updateSelectedCount();
    },
    
    // Update selected skills count
    updateSelectedCount: () => {
        const countElements = document.querySelectorAll('.selected-skills-count');
        countElements.forEach(el => {
            el.textContent = `${AppState.selectedSkills.length} skills selected`;
        });
    },
    
    // Get selected skills
    getSelected: () => [...AppState.selectedSkills],
    
    // Clear all selections
    clearAll: () => {
        AppState.selectedSkills = [];
        document.querySelectorAll('.skill-tag.selected').forEach(tag => {
            tag.classList.remove('selected');
        });
        SkillManager.updateSelectedCount();
    }
};

// Form Validation
const FormValidator = {
    // Validate email
    isValidEmail: (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },
    
    // Validate required fields
    validateRequired: (formData, requiredFields) => {
        const errors = [];
        
        requiredFields.forEach(field => {
            if (!formData[field] || formData[field].trim() === '') {
                errors.push(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
            }
        });
        
        return errors;
    },
    
    // Validate student form
    validateStudentForm: (formData) => {
        const errors = FormValidator.validateRequired(formData, 
            ['name', 'email', 'education']);
        
        if (formData.email && !FormValidator.isValidEmail(formData.email)) {
            errors.push('Please enter a valid email address');
        }
        
        if (AppState.selectedSkills.length === 0) {
            errors.push('Please select at least one skill you want to learn');
        }
        
        return errors;
    },
    
    // Validate professional form
    validateProfessionalForm: (formData) => {
        const errors = FormValidator.validateRequired(formData, 
            ['name', 'email', 'title', 'company', 'experience']);
        
        if (formData.email && !FormValidator.isValidEmail(formData.email)) {
            errors.push('Please enter a valid email address');
        }
        
        if (AppState.selectedSkills.length === 0) {
            errors.push('Please select at least one skill you can teach');
        }
        
        return errors;
    }
};

// Status Message Handler
const StatusMessage = {
    show: (containerId, message, type = 'success', duration = 5000) => {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.innerHTML = `
            <div class="status-message status-${type}">
                <span>${message}</span>
                <button class="status-close" onclick="this.parentElement.remove()">×</button>
            </div>
        `;
        
        // Auto remove after duration
        if (duration > 0) {
            setTimeout(() => {
                const messageEl = container.querySelector('.status-message');
                if (messageEl) {
                    messageEl.remove();
                }
            }, duration);
        }
    },
    
    clear: (containerId) => {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = '';
        }
    }
};

// Main Application Functions
const App = {
    // Initialize application
    init: () => {
        App.bindEvents();
        App.initializeAnimations();
    },
    
    // Bind event listeners
    bindEvents: () => {
        // Student form submission
        const studentForm = document.getElementById('studentForm');
        if (studentForm) {
            studentForm.addEventListener('submit', App.handleStudentSubmission);
        }
        
        // Professional form submission
        const professionalForm = document.getElementById('professionalForm');
        if (professionalForm) {
            professionalForm.addEventListener('submit', App.handleProfessionalSubmission);
        }
        
        // Smooth scrolling for navigation
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-scroll-to]')) {
                e.preventDefault();
                const target = e.target.getAttribute('data-scroll-to');
                Utils.scrollToElement(target);
            }
        });
    },
    
    // Initialize animations
    initializeAnimations: () => {
        // Intersection Observer for fade-in animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        });
        
        document.querySelectorAll('.feature-card').forEach(card => {
            observer.observe(card);
        });
    },
    
    // Handle student form submission
    handleStudentSubmission: async (e) => {
        e.preventDefault();
        
        const formData = {
            type: 'student',
            name: document.getElementById('studentName').value.trim(),
            email: document.getElementById('studentEmail').value.trim(),
            education: document.getElementById('studentEducation').value,
            goals: document.getElementById('studentGoals').value.trim(),
            skills: SkillManager.getSelected(),
            timestamp: new Date().toISOString(),
            id: Utils.generateId()
        };
        
        // Validate form
        const errors = FormValidator.validateStudentForm(formData);
        if (errors.length > 0) {
            StatusMessage.show('studentStatusMessage', errors.join('<br>'), 'error');
            return;
        }
        
        // Show loading
        const submitBtn = e.target.querySelector('button[type="submit"]');
        Utils.showLoading(submitBtn);
        
        try {
            // Simulate API call
            await App.simulateApiCall(2000);
            
            // Store user data
            AppState.currentUser = formData;
            AppState.registeredUsers.push(formData);
            
            StatusMessage.show('studentStatusMessage', 
                '🎉 Registration successful! Finding your perfect mentors...', 'success');
            
            // Find matches after a delay
            setTimeout(() => {
                App.showMatches(formData);
            }, 2000);
            
        } catch (error) {
            StatusMessage.show('studentStatusMessage', 
                'Something went wrong. Please try again.', 'error');
        } finally {
            Utils.hideLoading(submitBtn);
        }
    },
    
    // Handle professional form submission
    handleProfessionalSubmission: async (e) => {
        e.preventDefault();
        
        const formData = {
            type: 'professional',
            name: document.getElementById('professionalName').value.trim(),
            email: document.getElementById('professionalEmail').value.trim(),
            title: document.getElementById('professionalTitle').value.trim(),
            company: document.getElementById('professionalCompany').value.trim(),
            experience: document.getElementById('professionalExperience').value,
            bio: document.getElementById('professionalBio').value.trim(),
            skills: SkillManager.getSelected(),
            timestamp: new Date().toISOString(),
            id: Utils.generateId()
        };
        
        // Validate form
        const errors = FormValidator.validateProfessionalForm(formData);
        if (errors.length > 0) {
            StatusMessage.show('professionalStatusMessage', errors.join('<br>'), 'error');
            return;
        }
        
        // Show loading
        const submitBtn = e.target.querySelector('button[type="submit"]');
        Utils.showLoading(submitBtn);
        
        try {
            // Simulate API call
            await App.simulateApiCall(2000);
            
            // Store user data
            AppState.currentUser = formData;
            AppState.registeredUsers.push(formData);
            
            StatusMessage.show('professionalStatusMessage', 
                '🎉 Registration successful! Finding students who need your expertise...', 'success');
            
            // Find matches after a delay
            setTimeout(() => {
                App.showMatches(formData);
            }, 2000);
            
        } catch (error) {
            StatusMessage.show('professionalStatusMessage', 
                'Something went wrong. Please try again.', 'error');
        } finally {
            Utils.hideLoading(submitBtn);
        }
    },
    
    // Simulate API call
    simulateApiCall: (delay = 1000) => {
        return new Promise((resolve) => {
            setTimeout(resolve, delay);
        });
    },
    
    // Show matches based on user type
    showMatches: (userData) => {
        // Hide registration forms
        document.querySelectorAll('.registration-section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Show dashboard
        document.getElementById('dashboard').classList.add('active');
        
        // Generate and display matches
        const matches = App.generateMatches(userData);
        App.displayMatches(matches);
        
        // Scroll to dashboard
        Utils.scrollToElement('dashboard');
    },
    
    // Generate matches based on user type and skills
    generateMatches: (userData) => {
        let potentialMatches = [];
        
        if (userData.type === 'student') {
            // Find professionals who can teach the skills student wants to learn
            potentialMatches = mockProfessionals.filter(professional => {
                const commonSkills = professional.skills.filter(skill => 
                    userData.skills.includes(skill));
                return commonSkills.length > 0;
            }).map(professional => ({
                ...professional,
                matchScore: Utils.calculateMatchScore(userData.skills, professional.skills),
                commonSkills: professional.skills.filter(skill => userData.skills.includes(skill)),
                type: 'mentor'
            }));
        } else {
            // Find students who want to learn the skills professional can teach
            potentialMatches = mockStudents.filter(student => {
                const commonSkills = student.interestedSkills.filter(skill => 
                    userData.skills.includes(skill));
                return commonSkills.length > 0;
            }).map(student => ({
                ...student,
                matchScore: Utils.calculateMatchScore(userData.skills, student.interestedSkills),
                commonSkills: userData.skills.filter(skill => student.interestedSkills.includes(skill)),
                type: 'student'
            }));
        }
        
        // Sort by match score
        return potentialMatches.sort((a, b) => b.matchScore - a.matchScore);
    },
    
    // Display matches in the dashboard
    displayMatches: (matches) => {
        const container = document.getElementById('matchResults');
        
        if (matches.length === 0) {
            container.innerHTML = `
                <div class="no-matches">
                    <h3>No matches found</h3>
                    <p>Try expanding your skill selection or check back later for new members.</p>
                    <button class="btn btn-primary" onclick="resetApplication()">Update Skills</button>
                </div>
            `;
            return;
        }
        
        container.innerHTML = matches.map(match => {
            if (AppState.currentUser.type === 'student') {
                return App.createMentorCard(match);
            } else {
                return App.createStudentCard(match);
            }
        }).join('');
    },
    
    // Create mentor card for students
    createMentorCard: (mentor) => {
        return `
            <div class="match-card">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
                    <div style="flex: 1;">
                        <h3 style="margin: 0 0 0.5rem 0;">${mentor.name}</h3>
                        <p style="margin: 0; color: var(--text-light); font-weight: 600;">${mentor.title}</p>
                        <p style="margin: 0.25rem 0; color: var(--text-light);">${mentor.company} • ${mentor.experience}</p>
                        <p style="margin: 0.25rem 0; color: var(--text-light); font-size: 0.9rem;">📍 ${mentor.location}</p>
                    </div>
                    <span class="match-score">${mentor.matchScore}% match</span>
                </div>
                
                <div style="margin-bottom: 1rem;">
                    <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 0.5rem;">
                        <span style="font-size: 0.9rem;">⭐ ${mentor.rating}</span>
                        <span style="font-size: 0.9rem;">👥 ${mentor.sessions} sessions</span>
                    </div>
                    <p style="font-size: 0.9rem; color: var(--text-light); margin: 0.5rem 0;">${mentor.bio}</p>
                </div>
                
                <div style="margin-bottom: 1rem;">
                    <strong style="font-size: 0.9rem;">Can teach:</strong>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.25rem; margin-top: 0.5rem;">
                        ${mentor.commonSkills.map(skill => 
                            `<span style="background: var(--success); color: white; padding: 0.25rem 0.5rem; border-radius: 12px; font-size: 0.8rem;">${skill}</span>`
                        ).join('')}
                    </div>
                </div>
                
                <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                    <button class="btn btn-primary" onclick="connectWithMentor('${mentor.id}', '${mentor.name}')">
                        Connect
                    </button>
                    <button class="btn btn-secondary" onclick="viewProfile('${mentor.id}')">
                        View Profile
                    </button>
                </div>
            </div>
        `;
    },
    
    // Create student card for professionals
    createStudentCard: (student) => {
        return `
            <div class="match-card">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
                    <div style="flex: 1;">
                        <h3 style="margin: 0 0 0.5rem 0;">${student.name}</h3>
                        <p style="margin: 0; color: var(--text-light); font-weight: 600;">${student.education}</p>
                        <p style="margin: 0.25rem 0; color: var(--text-light);">${student.university}</p>
                        <p style="margin: 0.25rem 0; color: var(--text-light); font-size: 0.9rem;">Level: ${student.level}</p>
                    </div>
                    <span class="match-score">${student.matchScore}% match</span>
                </div>
                
                <div style="margin-bottom: 1rem;">
                    <p style="font-size: 0.9rem; color: var(--text-light); margin: 0.5rem 0;"><strong>Goals:</strong> ${student.goals}</p>
                </div>
                
                <div style="margin-bottom: 1rem;">
                    <strong style="font-size: 0.9rem;">Wants to learn:</strong>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.25rem; margin-top: 0.5rem;">
                        ${student.commonSkills.map(skill => 
                            `<span style="background: var(--primary); color: white; padding: 0.25rem 0.5rem; border-radius: 12px; font-size: 0.8rem;">${skill}</span>`
                        ).join('')}
                    </div>
                </div>
                
                <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                    <button class="btn btn-primary" onclick="acceptStudent('${student.id}', '${student.name}')">
                        Accept as Mentee
                    </button>
                    <button class="btn btn-secondary" onclick="scheduleCall('${student.id}')">
                        Schedule Call
                    </button>
                </div>
            </div>
        `;
    }
};

// Global Functions (called from HTML)

// Show user type selection
function showUserTypeSelection() {
    document.getElementById('userTypeSelection').style.display = 'block';
    Utils.scrollToElement('userTypeSelection');
}

// Select user type
function selectUserType(type) {
    AppState.currentUserType = type;
    AppState.selectedSkills = [];
    
    // Hide user type selection
    document.getElementById('userTypeSelection').style.display = 'none';
    
    // Show appropriate registration form
    if (type === 'student') {
        document.getElementById('studentRegistration').classList.add('active');
        SkillManager.initialize('studentSkillTags');
    } else {
        document.getElementById('professionalRegistration').classList.add('active');
        SkillManager.initialize('professionalSkillTags');
    }
    
    // Scroll to form
    setTimeout(() => {
        const activeForm = document.querySelector('.registration-section.active');
        if (activeForm) {
            activeForm.scrollIntoView({ behavior: 'smooth' });
        }
    }, 100);
}

// Scroll to section
function scrollToSection(sectionId) {
    Utils.scrollToElement(sectionId);
}

// Reset application to initial state
function resetApplication() {
    // Hide all sections except hero and features
    document.getElementById('userTypeSelection').style.display = 'none';
    document.querySelectorAll('.registration-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById('dashboard').classList.remove('active');
    
    // Reset application state
    AppState.currentUserType = null;
    AppState.selectedSkills = [];
    AppState.currentUser = null;
    AppState.matches = [];
    
    // Clear forms
    document.querySelectorAll('form').forEach(form => form.reset());
    
    // Clear status messages
    StatusMessage.clear('studentStatusMessage');
    StatusMessage.clear('professionalStatusMessage');
    
    // Clear skill selections
    SkillManager.clearAll();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Connect with mentor (for students)
function connectWithMentor(mentorId, mentorName) {
    // Show connection modal or process
    showConnectionModal({
        type: 'mentor',
        id: mentorId,
        name: mentorName,
        action: 'connect'
    });
}

// Accept student (for professionals)
function acceptStudent(studentId, studentName) {
    showConnectionModal({
        type: 'student',
        id: studentId,
        name: studentName,
        action: 'accept'
    });
}

// Schedule call
function scheduleCall(userId) {
    showSchedulingModal(userId);
}

// View profile
function viewProfile(userId) {
    showProfileModal(userId);
}

// Modal Functions
function showConnectionModal(data) {
    const modal = createModal('connectionModal', 'Connection Request');
    const content = modal.querySelector('.modal-content');
    
    const actionText = data.action === 'connect' ? 'connect with' : 'accept';
    const roleText = data.type === 'mentor' ? 'mentor' : 'student';
    
    content.innerHTML += `
        <div style="text-align: center; padding: 1rem 0;">
            <h3>Ready to ${actionText} ${data.name}?</h3>
            <p>This ${roleText} will be notified of your interest and can reach out to you directly.</p>
            
            <div style="margin: 2rem 0;">
                <label for="connectionMessage" style="display: block; margin-bottom: 0.5rem; font-weight: 600;">
                    Send a message (optional):
                </label>
                <textarea id="connectionMessage" class="form-control" rows="3" 
                    placeholder="Hi ${data.name}, I'm interested in ${data.action === 'connect' ? 'learning from you' : 'mentoring you'}..."></textarea>
            </div>
            
            <div style="display: flex; gap: 1rem; justify-content: center;">
                <button class="btn btn-secondary" onclick="closeModal('connectionModal')">Cancel</button>
                <button class="btn btn-primary" onclick="sendConnectionRequest('${data.id}', '${data.name}')">
                    Send Request
                </button>
            </div>
        </div>
    `;
    
    showModal('connectionModal');
}

function showSchedulingModal(userId) {
    const modal = createModal('schedulingModal', 'Schedule a Call');
    const content = modal.querySelector('.modal-content');
    
    content.innerHTML += `
        <div style="padding: 1rem 0;">
            <div class="form-group">
                <label for="callDate">Preferred Date:</label>
                <input type="date" id="callDate" class="form-control" min="${new Date().toISOString().split('T')[0]}">
            </div>
            
            <div class="form-group">
                <label for="callTime">Preferred Time:</label>
                <select id="callTime" class="form-control">
                    <option value="">Select time</option>
                    <option value="09:00">9:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="15:00">3:00 PM</option>
                    <option value="16:00">4:00 PM</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="callTopic">What would you like to discuss?</label>
                <textarea id="callTopic" class="form-control" rows="3" 
                    placeholder="e.g., Career advice, specific skills, project review..."></textarea>
            </div>
            
            <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 2rem;">
                <button class="btn btn-secondary" onclick="closeModal('schedulingModal')">Cancel</button>
                <button class="btn btn-primary" onclick="scheduleCallRequest('${userId}')">
                    Schedule Call
                </button>
            </div>
        </div>
    `;
    
    showModal('schedulingModal');
}

function showProfileModal(userId) {
    const modal = createModal('profileModal', 'Profile Details');
    const content = modal.querySelector('.modal-content');
    
    // Find user data (mock)
    const userData = mockProfessionals.find(p => p.id == userId) || mockStudents.find(s => s.id == userId);
    
    if (!userData) return;
    
    content.innerHTML += `
        <div style="padding: 1rem 0;">
            <div style="text-align: center; margin-bottom: 2rem;">
                <div style="width: 80px; height: 80px; border-radius: 50%; background: var(--primary); 
                    display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; 
                    color: white; font-size: 2rem; font-weight: bold;">
                    ${userData.name.charAt(0)}
                </div>
                <h3>${userData.name}</h3>
                ${userData.title ? `<p style="color: var(--text-light);">${userData.title} at ${userData.company}</p>` : ''}
                ${userData.education ? `<p style="color: var(--text-light);">${userData.education}</p>` : ''}
            </div>
            
            ${userData.bio ? `
                <div style="margin-bottom: 1.5rem;">
                    <h4>About</h4>
                    <p>${userData.bio}</p>
                </div>
            ` : ''}
            
            ${userData.goals ? `
                <div style="margin-bottom: 1.5rem;">
                    <h4>Goals</h4>
                    <p>${userData.goals}</p>
                </div>
            ` : ''}
            
            <div style="margin-bottom: 1.5rem;">
                <h4>Skills</h4>
                <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                    ${(userData.skills || userData.interestedSkills || []).map(skill => 
                        `<span class="skill-tag selected">${skill}</span>`
                    ).join('')}
                </div>
            </div>
            
            ${userData.rating ? `
                <div style="margin-bottom: 1.5rem;">
                    <h4>Stats</h4>
                    <p>⭐ ${userData.rating} rating • 👥 ${userData.sessions} sessions completed</p>
                </div>
            ` : ''}
            
            <div style="text-align: center; margin-top: 2rem;">
                <button class="btn btn-secondary" onclick="closeModal('profileModal')">Close</button>
            </div>
        </div>
    `;
    
    showModal('profileModal');
}

// Modal utilities
function createModal(id, title) {
    // Remove existing modal
    const existing = document.getElementById(id);
    if (existing) existing.remove();
    
    const modal = document.createElement('div');
    modal.id = id;
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #e2e8f0;">
                <h2 style="margin: 0;">${title}</h2>
                <button class="modal-close" onclick="closeModal('${id}')">&times;</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    return modal;
}

function showModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => modal.remove(), 300);
    }
}

// Connection and scheduling handlers
function sendConnectionRequest(userId, userName) {
    const message = document.getElementById('connectionMessage')?.value || '';
    
    // Simulate sending request
    setTimeout(() => {
        closeModal('connectionModal');
        
        // Show success message
        const successModal = createModal('successModal', 'Request Sent!');
        const content = successModal.querySelector('.modal-content');
        
        content.innerHTML += `
            <div style="text-align: center; padding: 2rem 0;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">🎉</div>
                <h3>Connection request sent to ${userName}!</h3>
                <p>They will receive your message and can contact you directly. 
                   You'll also receive an email confirmation shortly.</p>
                <button class="btn btn-primary" onclick="closeModal('successModal')" style="margin-top: 1rem;">
                    Great!
                </button>
            </div>
        `;
        
        showModal('successModal');
    }, 500);
}

function scheduleCallRequest(userId) {
    const date = document.getElementById('callDate')?.value;
    const time = document.getElementById('callTime')?.value;
    const topic = document.getElementById('callTopic')?.value;
    
    if (!date || !time) {
        alert('Please select both date and time');
        return;
    }
    
    // Simulate scheduling
    setTimeout(() => {
        closeModal('schedulingModal');
        
        const successModal = createModal('successModal', 'Call Scheduled!');
        const content = successModal.querySelector('.modal-content');
        
        content.innerHTML += `
            <div style="text-align: center; padding: 2rem 0;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">📅</div>
                <h3>Call scheduled successfully!</h3>
                <p><strong>Date:</strong> ${Utils.formatDate(date)}<br>
                   <strong>Time:</strong> ${time}<br>
                   ${topic ? `<strong>Topic:</strong> ${topic}` : ''}</p>
                <p>You'll receive a calendar invite and meeting link via email.</p>
                <button class="btn btn-primary" onclick="closeModal('successModal')" style="margin-top: 1rem;">
                    Perfect!
                </button>
            </div>
        `;
        
        showModal('successModal');
    }, 500);
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        const modalId = e.target.id;
        closeModal(modalId);
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
            closeModal(activeModal.id);
        }
    }
});

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    App.init();
    
    // Add some interactive features
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', () => {
            resetApplication();
        });
    }
    
    // Add scroll effect to navbar
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
});