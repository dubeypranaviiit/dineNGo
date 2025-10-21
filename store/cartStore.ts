// // "use client";

// // import { create } from "zustand";
// // import { persist, createJSONStorage } from "zustand/middleware";

// // export interface CartItem {
// //   _id: string;          // Mongoose ObjectId (unique per dish)
// //   name: string;
// //   price: number;
// //   image: string;
// //   quantity: number;
// // }

// // interface CartStore {
// //   items: CartItem[];
// //   addToCart: (item: Omit<CartItem, "quantity">) => void;
// //   decrementItem: (id: string) => void;
// //   removeFromCart: (id: string) => void;
// //   clearCart: () => void;
// // }

// // export const useCartStore = create<CartStore>()(
// //   persist(
// //     (set, get) => ({
// //       items: [],

// //       addToCart: (item) => {
// //         const existing = get().items.find((i) => i._id === item._id);
// //         if (existing) {
// //           // increment quantity
// //           set({
// //             items: get().items.map((i) =>
// //               i._id === item._id
// //                 ? { ...i, quantity: i.quantity + 1 }
// //                 : i
// //             ),
// //           });
// //         } else {
// //           // add new item
// //           set({ items: [...get().items, { ...item, quantity: 1 }] });
// //         }
// //       },

// //       decrementItem: (id) => {
// //         const existing = get().items.find((i) => i._id === id);
// //         if (!existing) return;

// //         if (existing.quantity > 1) {
// //           set({
// //             items: get().items.map((i) =>
// //               i._id === id ? { ...i, quantity: i.quantity - 1 } : i
// //             ),
// //           });
// //         } else {
// //           set({ items: get().items.filter((i) => i._id !== id) });
// //         }
// //       },

// //       removeFromCart: (id) =>
// //         set({ items: get().items.filter((i) => i._id !== id) }),

// //       clearCart: () => set({ items: [] }),
// //     }),
// //     {
// //       name: "restaurant-cart",
// //       storage: createJSONStorage(() => localStorage),
// //     }
// //   )
// // );
// "use client";

// import { create } from "zustand";
// import { persist, createJSONStorage } from "zustand/middleware";

// export interface CartItem {
//   _id: string;       // unique per dish
//   name: string;
//   price: number;
//   image: string;
//   quantity: number;
// }

// interface CartStore {
//   items: CartItem[];
//   addToCart: (item: Omit<CartItem, "quantity">) => void; // quantity auto-handled
//   decrementItem: (id: string) => void;
//   removeFromCart: (id: string) => void;
//   clearCart: () => void;
// }

// export const useCartStore = create<CartStore>()(
//   persist(
//     (set, get) => ({
//       items: [],

//       addToCart: (item) => {
//         const existing = get().items.find((i) => i._id === item._id);
//         if (existing) {
//           set({
//             items: get().items.map((i) =>
//               i._id === item._id
//                 ? { ...i, quantity: i.quantity + 1 }
//                 : i
//             ),
//           });
//         } else {
//           set({ items: [...get().items, { ...item, quantity: 1 }] });
//         }
//       },

//       decrementItem: (id) => {
//         const existing = get().items.find((i) => i._id === id);
//         if (!existing) return;

//         if (existing.quantity > 1) {
//           set({
//             items: get().items.map((i) =>
//               i._id === id ? { ...i, quantity: i.quantity - 1 } : i
//             ),
//           });
//         } else {
//           set({ items: get().items.filter((i) => i._id !== id) });
//         }
//       },

//       removeFromCart: (id) => set({ items: get().items.filter((i) => i._id !== id) }),

//       clearCart: () => set({ items: [] }),
//     }),
//     {
//       name: "restaurant-cart",
//       storage: createJSONStorage(() => localStorage),
//     }
//   )
// );

"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Each item in the cart
export interface CartItem {
  _id: string;       // Unique dish ID
  name: string;
  price: number;
  image: string;
  quantity: number;
}

// Store interface
interface CartStore {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void; // quantity auto-handled
  decrementItem: (id: string) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      // Add item: increments quantity if exists
      addToCart: (item) => {
        const existing = get().items.find((i) => i._id === item._id);
        if (existing) {
          set({
            items: get().items.map((i) =>
              i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          });
        } else {
          set({ items: [...get().items, { ...item, quantity: 1 }] });
        }
      },

      // Decrement quantity or remove
      decrementItem: (id) => {
        const existing = get().items.find((i) => i._id === id);
        if (!existing) return;

        if (existing.quantity > 1) {
          set({
            items: get().items.map((i) =>
              i._id === id ? { ...i, quantity: i.quantity - 1 } : i
            ),
          });
        } else {
          set({ items: get().items.filter((i) => i._id !== id) });
        }
      },

      // Remove item completely
      removeFromCart: (id) => set({ items: get().items.filter((i) => i._id !== id) }),

      // Clear cart
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "restaurant-cart",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
