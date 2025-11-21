import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from './supabase';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

/**
 * AuthProvider 컴포넌트
 *
 * Props:
 * @param {ReactNode} children - 자식 컴포넌트 [Required]
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 로컬 스토리지에서 사용자 정보 확인
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      // Supabase에서 사용자 확인
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('username', username)
        .eq('password', password)
        .single();

      if (error) throw error;

      if (data) {
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data));
        return { success: true, user: data };
      }

      return { success: false, error: '아이디 또는 비밀번호가 일치하지 않습니다.' };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  };

  const signup = async (username, password, nickname) => {
    try {
      // 중복 아이디 확인
      const { data: existing } = await supabase
        .from('users')
        .select('username')
        .eq('username', username)
        .single();

      if (existing) {
        return { success: false, error: '이미 사용 중인 아이디입니다.' };
      }

      // 새 사용자 생성
      const { data, error } = await supabase
        .from('users')
        .insert([{ username, password, nickname }])
        .select()
        .single();

      if (error) throw error;

      return { success: true, user: data };
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
