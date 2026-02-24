/**
 * Boojy Account — Auth + Dashboard
 */

const SUPABASE_URL = 'https://wupmcvhzstgsdrvcigtm.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1cG1jdmh6c3Rnc2RydmNpZ3RtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3ODkzNDMsImV4cCI6MjA4NzM2NTM0M30.D8Zbzblj0oyP28ACJystGWSmqmwdBIyp7mMQmwqtPjM';

// supabase-js UMD exports as window.supabase or window.Supabase
const createClient = (window.supabase && window.supabase.createClient)
    || (window.Supabase && window.Supabase.createClient);

if (!createClient) {
    console.error('Supabase client library not loaded');
}

const sb = createClient ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

// DOM elements
const signinView = document.getElementById('signin-view');
const dashboardView = document.getElementById('dashboard-view');
const emailForm = document.getElementById('email-form');
const emailInput = document.getElementById('email-input');
const passwordInput = document.getElementById('password-input');
const emailSubmit = document.getElementById('email-submit');
const emailToggle = document.getElementById('email-toggle');
const authError = document.getElementById('auth-error');
const btnGoogle = document.getElementById('btn-google');
const btnApple = document.getElementById('btn-apple');
const btnEmail = document.getElementById('btn-email');
const btnSignOut = document.getElementById('btn-signout');

// Dashboard elements
const dashEmail = document.getElementById('dash-email');
const dashTier = document.getElementById('dash-tier');
const dashStorageBar = document.getElementById('dash-storage-bar');
const dashStorageText = document.getElementById('dash-storage-text');
const dashManage = document.getElementById('dash-manage');
const dashUpgrade = document.getElementById('dash-upgrade');

let isSignUp = true;

// ===================================
// Auth State
// ===================================
async function checkSession() {
    if (!sb) return;
    try {
        const { data: { session } } = await sb.auth.getSession();
        if (session) {
            showDashboard(session.user);
        }
    } catch (err) {
        console.error('Session check failed:', err);
    }
}

if (sb) {
    sb.auth.onAuthStateChange((event, session) => {
        if (session) {
            showDashboard(session.user);
        } else {
            showSignIn();
        }
    });
}

// ===================================
// Views
// ===================================
function showSignIn() {
    signinView.style.display = 'block';
    dashboardView.style.display = 'none';
    if (emailForm) emailForm.style.display = 'none';
    if (authError) authError.textContent = '';
}

async function showDashboard(user) {
    signinView.style.display = 'none';
    dashboardView.style.display = 'block';

    dashEmail.textContent = user.email || 'No email';

    try {
        const { data: profile } = await sb
            .from('profiles')
            .select('tier, storage_limit_bytes, stripe_customer_id')
            .eq('id', user.id)
            .single();

        const { data: usage } = await sb
            .from('storage_usage')
            .select('bytes_used, file_count')
            .eq('user_id', user.id)
            .single();

        if (profile) {
            dashTier.textContent = profile.tier === 'orbit' ? 'Orbit' : 'Free';
            dashTier.className = 'dash-tier-badge dash-tier-' + profile.tier;

            if (profile.tier === 'orbit' && profile.stripe_customer_id) {
                dashManage.style.display = 'inline-block';
                dashUpgrade.style.display = 'none';
            } else {
                dashManage.style.display = 'none';
                dashUpgrade.style.display = 'inline-block';
            }

            if (usage) {
                const used = usage.bytes_used;
                const limit = profile.storage_limit_bytes;
                const pct = Math.min(100, (used / limit) * 100);
                dashStorageBar.style.width = pct + '%';
                dashStorageText.textContent = formatBytes(used) + ' / ' + formatBytes(limit);
            }
        }
    } catch (err) {
        console.error('Failed to load profile:', err);
    }
}

// ===================================
// Email Auth
// ===================================
if (btnEmail) {
    btnEmail.addEventListener('click', () => {
        emailForm.style.display = emailForm.style.display === 'none' ? 'flex' : 'none';
        authError.textContent = '';
    });
}

// Sign in / Sign up toggle
function handleToggle(e) {
    e.preventDefault();
    isSignUp = !isSignUp;
    emailSubmit.textContent = isSignUp ? 'Sign up' : 'Sign in';
    emailToggle.innerHTML = isSignUp
        ? 'Already have an account? <a href="#" id="email-toggle-link">Sign in</a>'
        : 'Don\'t have an account? <a href="#" id="email-toggle-link">Sign up</a>';
    document.getElementById('email-toggle-link').addEventListener('click', handleToggle);
    authError.textContent = '';
}

if (document.getElementById('email-toggle-link')) {
    document.getElementById('email-toggle-link').addEventListener('click', handleToggle);
}

if (emailForm) {
    emailForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!sb) return;
        authError.textContent = '';
        emailSubmit.disabled = true;
        emailSubmit.textContent = 'Loading...';

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        if (!email || !password) {
            authError.textContent = 'Please fill in both fields.';
            emailSubmit.disabled = false;
            emailSubmit.textContent = isSignUp ? 'Sign up' : 'Sign in';
            return;
        }

        if (password.length < 6) {
            authError.textContent = 'Password must be at least 6 characters.';
            emailSubmit.disabled = false;
            emailSubmit.textContent = isSignUp ? 'Sign up' : 'Sign in';
            return;
        }

        let result;
        if (isSignUp) {
            result = await sb.auth.signUp({ email, password });
        } else {
            result = await sb.auth.signInWithPassword({ email, password });
        }

        if (result.error) {
            authError.textContent = result.error.message;
        }
        emailSubmit.disabled = false;
        emailSubmit.textContent = isSignUp ? 'Sign up' : 'Sign in';
    });
}

// ===================================
// OAuth
// ===================================
if (btnGoogle) {
    btnGoogle.addEventListener('click', async () => {
        if (!sb) return;
        await sb.auth.signInWithOAuth({
            provider: 'google',
            options: { redirectTo: window.location.origin + '/account/' }
        });
    });
}

if (btnApple) {
    btnApple.addEventListener('click', async () => {
        if (!sb) return;
        await sb.auth.signInWithOAuth({
            provider: 'apple',
            options: { redirectTo: window.location.origin + '/account/' }
        });
    });
}

// ===================================
// Sign Out
// ===================================
if (btnSignOut) {
    btnSignOut.addEventListener('click', async () => {
        if (!sb) return;
        await sb.auth.signOut();
    });
}

// ===================================
// Manage Subscription (Stripe Portal)
// ===================================
if (dashManage) {
    dashManage.addEventListener('click', async () => {
        if (!sb) return;
        const { data: { session } } = await sb.auth.getSession();
        if (!session) return;
        window.location.href = 'https://billing.stripe.com/p/login/test_00g00000000000';
    });
}

// ===================================
// Helpers
// ===================================
function formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const units = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes / Math.pow(1024, i)).toFixed(i > 1 ? 1 : 0) + ' ' + units[i];
}

// Init
checkSession();
