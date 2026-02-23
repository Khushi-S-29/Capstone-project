import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function ProfilePage({ user, onClose, onLogout }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        // In a real app, you might fetch from a 'profiles' table
        // const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        // For now, we just use the user metadata
        setProfile({
          fullName: user.user_metadata?.full_name || 'User',
          email: user.email,
          lastSignIn: new Date(user.last_sign_in_at).toLocaleString(),
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    onLogout();
  };

  return (
    <div
      className="auth-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="User Profile"
      onClick={onClose}
    >
      <section className="auth-page" onClick={(event) => event.stopPropagation()}>
        <button className="auth-close" onClick={onClose} aria-label="Close profile page">
          Close
        </button>

        <div className="auth-grid" style={{ gridTemplateColumns: '1fr' }}>
          <div className="auth-card" style={{ padding: '3rem' }}>
            <h2 className="auth-title" style={{ marginBottom: '2rem' }}>Your Profile</h2>
            
            {loading ? (
              <p>Loading profile...</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <p className="eyebrow">Full Name</p>
                  <p style={{ fontSize: '1.25rem', fontWeight: '500' }}>{profile?.fullName}</p>
                </div>
                
                <div>
                  <p className="eyebrow">Email</p>
                  <p style={{ fontSize: '1.25rem', fontWeight: '500' }}>{profile?.email}</p>
                </div>

                <div>
                  <p className="eyebrow">Last Sign In</p>
                  <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>{profile?.lastSignIn}</p>
                </div>

                <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
                  <button 
                    className="auth-submit" 
                    onClick={handleLogout}
                    style={{ backgroundColor: 'var(--error-color, #ef4444)' }}
                  >
                    Log Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
