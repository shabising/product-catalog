import CartDrawer from '../components/CartDrawer';

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAF7F2' }}>
      {children}
      <CartDrawer />
    </div>
  );
}