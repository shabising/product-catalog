import useCartStore from '../store/useCartStore';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty, clearCart, totalPrice } = useCartStore();

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={closeCart}
      />

      <div className="fixed top-0 right-0 h-full w-80 bg-white z-50 shadow-2xl flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Cart ({items.length})</h2>
          <button
            onClick={closeCart}
            className="text-gray-400 hover:text-gray-600 text-xl"
            aria-label="Close cart"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="text-4xl mb-3">🛒</p>
              <p className="text-gray-500 font-medium">Your cart is empty</p>
              <p className="text-gray-400 text-sm mt-1">Add some products to get started</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {items.map(item => (
                <div key={item.id} className="flex gap-3 items-start">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-16 h-16 rounded-lg object-cover border border-gray-100"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 line-clamp-1">{item.title}</p>
                    <p className="text-xs text-green-600 font-medium mb-2">${item.price.toFixed(2)}</p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        className="w-6 h-6 rounded-full border border-gray-200 text-xs flex items-center justify-center hover:bg-gray-50"
                      >
                        −
                      </button>
                      <span className="text-sm w-4 text-center">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        className="w-6 h-6 rounded-full border border-gray-200 text-xs flex items-center justify-center hover:bg-gray-50"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-gray-300 hover:text-red-400 transition text-lg"
                    aria-label="Remove item"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="px-5 py-4 border-t border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500">Total</span>
              <span className="font-semibold text-gray-900">${totalPrice().toFixed(2)}</span>
            </div>
            <button
              className="w-full py-2.5 rounded-xl text-sm text-white font-medium bg-[#DB7F8E] hover:bg-[#c06070] transition mb-2"
            >
              Checkout
            </button>
            <button
              onClick={clearCart}
              className="w-full py-2 rounded-xl text-sm text-gray-400 hover:text-gray-600 transition"
            >
              Clear cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}