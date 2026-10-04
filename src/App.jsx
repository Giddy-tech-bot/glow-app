import React, { useState, useEffect } from "react";
import TopBar from "./components/TopBar";
import BottomNav from "./components/BottomNav";
import HomeView from "./components/HomeView";
import DiscoverView from "./components/DiscoverView";
import BeauticianProfileView from "./components/BeauticianProfileView";
import BookingView from "./components/BookingView";
import PaymentView from "./components/PaymentView";
import ConfirmationView from "./components/ConfirmationView";
import BookingsView from "./components/BookingsView";
import SocialFeedView from "./components/SocialFeedView";
import PostCreateModal from "./components/PostCreateModal";
import GlowStudioModal from "./components/GlowStudioModal";
import ProDashboardView from "./components/ProDashboardView";
import ChatDrawer from "./components/ChatDrawer";
import BrandsView from "./components/BrandsView";
import UserProfileView from "./components/UserProfileView";
import RoleSwitcherModal from "./components/RoleSwitcherModal";
import CustomerDashboardView from "./components/CustomerDashboardView";
import ShopOwnerPortalView from "./components/ShopOwnerPortalView";
import ProductCheckoutModal from "./components/ProductCheckoutModal";
import AccountModal from "./components/AccountModal";

import {
  initialBeauticians,
  initialPosts,
  initialBrands,
  initialBookings,
  initialProducts,
  initialProductOrders
} from "./data/mockData";

const API_BASE = "/api";

const apiRequest = async (endpoint, options = {}) => {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  if (!response.ok) {
    const text = await response.text();
    let message = text || "Request failed";
    try {
      message = JSON.parse(text).message || message;
    } catch {
      // Keep the raw response text when the server does not return JSON.
    }
    throw new Error(message);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
};

export default function App() {
  const [currentAccount, setCurrentAccount] = useState(() => {
    const saved = localStorage.getItem("glow_account_v1");
    return saved ? JSON.parse(saved) : null;
  });

  // Persistent Role & User State: 'customer' | 'beautician' | 'shop_owner'
  const [currentRole, setCurrentRole] = useState(() => {
    return localStorage.getItem("glow_current_role") || currentAccount?.role || "customer";
  });

  // Persistent State
  const [beauticians, setBeauticians] = useState(() => {
    const saved = localStorage.getItem("glow_beauticians_v3");
    return saved ? JSON.parse(saved) : initialBeauticians;
  });

  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem("glow_posts_v3");
    return saved ? JSON.parse(saved) : initialPosts;
  });

  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem("glow_bookings_v3");
    return saved ? JSON.parse(saved) : initialBookings;
  });

  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("glow_products_v3");
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [productOrders, setProductOrders] = useState(() => {
    const saved = localStorage.getItem("glow_orders_v3");
    return saved ? JSON.parse(saved) : initialProductOrders;
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem("glow_current_role", currentRole);
  }, [currentRole]);

  useEffect(() => {
    if (currentAccount) {
      localStorage.setItem("glow_account_v1", JSON.stringify(currentAccount));
    } else {
      localStorage.removeItem("glow_account_v1");
    }
  }, [currentAccount]);

  useEffect(() => {
    localStorage.setItem("glow_beauticians_v3", JSON.stringify(beauticians));
  }, [beauticians]);

  useEffect(() => {
    localStorage.setItem("glow_posts_v3", JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem("glow_bookings_v3", JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem("glow_products_v3", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("glow_orders_v3", JSON.stringify(productOrders));
  }, [productOrders]);

  useEffect(() => {
    let isMounted = true;

    const loadFromApi = async () => {
      try {
        const [beauticiansResponse, postsResponse, bookingsResponse, productsResponse, ordersResponse] = await Promise.all([
          apiRequest("/beauticians"),
          apiRequest("/posts"),
          apiRequest("/bookings"),
          apiRequest("/products"),
          apiRequest("/product-orders")
        ]);

        if (!isMounted) return;

        setBeauticians(beauticiansResponse || initialBeauticians);
        setPosts(postsResponse || initialPosts);
        setBookings(bookingsResponse || initialBookings);
        setProducts(productsResponse || initialProducts);
        setProductOrders(ordersResponse || initialProductOrders);
      } catch (error) {
        console.warn("Falling back to local data because the backend is unavailable:", error);
      }
    };

    loadFromApi();

    return () => {
      isMounted = false;
    };
  }, []);

  // Navigation & View State
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedBeautician, setSelectedBeautician] = useState(beauticians[0]);
  const [selectedService, setSelectedService] = useState(beauticians[0].services[0]);
  const [inProgressBooking, setInProgressBooking] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    if (!beauticians.length) return;

    const selectedStillExists = beauticians.some((b) => b.id === selectedBeautician?.id);
    if (!selectedStillExists) {
      setSelectedBeautician(beauticians[0]);
      setSelectedService(beauticians[0].services[0] || null);
    }
  }, [beauticians, selectedBeautician]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // Beautician Pro Portal active persona
  const [activeProBeautician, setActiveProBeautician] = useState(beauticians[0]);

  // Modals & Drawers
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [isStudioOpen, setIsStudioOpen] = useState(false);
  const [chatBeautician, setChatBeautician] = useState(null);
  const [checkoutProduct, setCheckoutProduct] = useState(null);

  const navigate = (page) => {
    setCurrentPage(page);
  };

  const handleAccountSubmit = async ({ name, email, password, role, mode }) => {
    const result = await apiRequest(mode === "register" ? "/accounts" : "/accounts/login", {
      method: "POST",
      body: JSON.stringify(mode === "register" ? { name, email, password, role } : { email, password })
    });

    setCurrentAccount(result.account);
    setCurrentRole(result.account.role);
    setIsAccountModalOpen(false);
    if (result.account.role === "beautician") navigate("pro-dashboard");
    else if (result.account.role === "shop_owner") navigate("shop-portal");
    else navigate("home");
  };

  const openBeauticianProfile = (b) => {
    setSelectedBeautician(b);
    setSelectedService(b.services[0] || null);
    navigate("profile");
  };

  const openBeauticianById = (id) => {
    const found = beauticians.find((b) => b.id === id);
    if (found) {
      openBeauticianProfile(found);
    }
  };

  // Appointment & Booking Handlers (SERVICE APPOINTMENT - 20% DEPOSIT)
  const handleStartBooking = () => {
    navigate("book");
  };

  const handleConfirmBookingDetails = (bookingData) => {
    setInProgressBooking(bookingData);
    navigate("payment");
  };

  const handlePaymentSuccess = async (paymentMeta) => {
    const finalBooking = {
      ...inProgressBooking,
      ...paymentMeta,
      status: "Confirmed"
    };

    setBookings((prev) => [finalBooking, ...prev]);
    setInProgressBooking(finalBooking);

    try {
      await apiRequest("/bookings", {
        method: "POST",
        body: JSON.stringify(finalBooking)
      });
    } catch (error) {
      console.warn("Booking could not be saved to the backend:", error);
    }

    navigate("confirmation");
  };

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status: "Cancelled" } : b))
      );

      try {
        await apiRequest(`/bookings/${bookingId}`, {
          method: "PATCH",
          body: JSON.stringify({ status: "Cancelled" })
        });
      } catch (error) {
        console.warn("Could not update booking status in the backend:", error);
      }
    }
  };

  // Beautician Pro Actions
  const handleUpdateBookingStatus = async (bookingId, newStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
    );

    try {
      await apiRequest(`/bookings/${bookingId}`, {
        method: "PATCH",
        body: JSON.stringify({ status: newStatus })
      });
    } catch (error) {
      console.warn("Could not update booking status in the backend:", error);
    }
  };

  // Shop Owner Actions (LISTING PRODUCTS & ORDERS)
  const handleAddNewProduct = async (newProduct) => {
    setProducts((prev) => [newProduct, ...prev]);

    try {
      await apiRequest("/products", {
        method: "POST",
        body: JSON.stringify(newProduct)
      });
    } catch (error) {
      console.warn("Could not save product to the backend:", error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));

    try {
      await apiRequest(`/products/${productId}`, {
        method: "DELETE"
      });
    } catch (error) {
      console.warn("Could not delete product in the backend:", error);
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    setProductOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );

    try {
      await apiRequest(`/product-orders/${orderId}`, {
        method: "PATCH",
        body: JSON.stringify({ status: newStatus })
      });
    } catch (error) {
      console.warn("Could not update order status in the backend:", error);
    }
  };

  // Customer Product Marketplace Purchase Handler (100% FULL PRODUCT PAYMENT)
  const handleOrderSuccess = async (newOrder) => {
    setProductOrders((prev) => [newOrder, ...prev]);

    try {
      await apiRequest("/product-orders", {
        method: "POST",
        body: JSON.stringify(newOrder)
      });
    } catch (error) {
      console.warn("Order could not be saved to the backend:", error);
    }

    alert(`Order ${newOrder.id} placed! Track it under "My Product Orders".`);
  };

  // Social Feed Handlers
  const handleLikePost = (postId) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const liked = !p.likedByMe;
          return {
            ...p,
            likedByMe: liked,
            likesCount: liked ? p.likesCount + 1 : p.likesCount - 1
          };
        }
        return p;
      })
    );
  };

  const handleSavePost = (postId) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return { ...p, savedByMe: !p.savedByMe };
        }
        return p;
      })
    );
  };

  const handleAddComment = (postId, newComment) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            comments: [...(p.comments || []), newComment]
          };
        }
        return p;
      })
    );
  };

  const handlePublishMediaPost = async (newPost) => {
    const savedPost = {
      ...newPost,
      id: newPost.id || `p_${Date.now()}`,
      likesCount: newPost.likesCount || 0,
      likedByMe: false,
      savedByMe: false,
      comments: newPost.comments || []
    };

    setPosts((prev) => [savedPost, ...prev]);

    try {
      await apiRequest("/posts", {
        method: "POST",
        body: JSON.stringify(savedPost)
      });
    } catch (error) {
      console.warn("Post could not be saved to the backend:", error);
    }

    if (savedPost.beauticianId) {
      setBeauticians((prev) =>
        prev.map((b) => {
          if (b.id === savedPost.beauticianId) {
            const newWorkItem = {
              id: "w_" + Date.now(),
              title: savedPost.serviceName || savedPost.text.slice(0, 30),
              category: savedPost.category,
              mediaType: savedPost.mediaType,
              url: savedPost.videoUrl || savedPost.image,
              poster: savedPost.image,
              likes: 1
            };
            return {
              ...b,
              work: [newWorkItem, ...(b.work || [])]
            };
          }
          return b;
        })
      );
    }

    navigate("social");
  };

  const savedPosts = posts.filter((p) => p.savedByMe);
  const activeProBookings = bookings.filter(
    (b) => b.beauticianId === activeProBeautician.id && b.status === "Confirmed"
  );
  const activeShopOrders = productOrders.filter((o) => o.status !== "Delivered");

  return (
    <div className="glow-app">
      {/* Universal Top Bar with Role Switcher & Badges */}
      <TopBar
        currentPage={currentPage}
        onNavigate={navigate}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          if (q.trim() && currentPage === "home") {
            navigate("discover");
          }
        }}
        onOpenStudio={() => setIsStudioOpen(true)}
        onOpenRoleSwitcher={() => setIsRoleModalOpen(true)}
        currentRole={currentRole}
        currentAccountName={currentAccount?.name}
        userInitials={currentAccount?.name
          ?.trim()
          .split(/\s+/)
          .slice(0, 2)
          .map((part) => part[0])
          .join("")
          .toUpperCase()}
        activeBookingsCount={activeProBookings.length}
        activeShopOrdersCount={activeShopOrders.length}
      />

      {/* Main Routed View */}
      <main>
        {currentPage === "home" && (
          <HomeView
            beauticians={beauticians}
            onSelectBeautician={openBeauticianProfile}
            onNavigate={navigate}
            searchQuery={searchQuery}
            onCategorySelect={(cat) => setActiveCategory(cat)}
          />
        )}

        {currentPage === "discover" && (
          <DiscoverView
            beauticians={beauticians}
            onSelectBeautician={openBeauticianProfile}
            searchQuery={searchQuery}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        )}

        {currentPage === "profile" && (
          <BeauticianProfileView
            beautician={selectedBeautician}
            selectedService={selectedService}
            onSelectService={setSelectedService}
            onBook={handleStartBooking}
            onBack={() => navigate("discover")}
            onOpenChat={(b) => setChatBeautician(b)}
            onAddReview={() => {}}
            onOpenStudio={() => setIsStudioOpen(true)}
          />
        )}

        {/* SERVICE BOOKING (Pay 20% Deposit) */}
        {currentPage === "book" && (
          <BookingView
            beautician={selectedBeautician}
            service={selectedService || selectedBeautician.services[0]}
            onConfirmBooking={handleConfirmBookingDetails}
            onBack={() => navigate("profile")}
          />
        )}

        {currentPage === "payment" && (
          <PaymentView
            beautician={selectedBeautician}
            service={selectedService || selectedBeautician.services[0]}
            booking={inProgressBooking}
            onPaymentSuccess={handlePaymentSuccess}
            onBack={() => navigate("book")}
          />
        )}

        {currentPage === "confirmation" && (
          <ConfirmationView
            beautician={selectedBeautician}
            service={selectedService || selectedBeautician.services[0]}
            booking={inProgressBooking}
            onGoHome={() => navigate("home")}
            onGoBookings={() => navigate("customer-dashboard")}
          />
        )}

        {/* 1. DEDICATED CUSTOMER DASHBOARD (Appointments + Product Orders) */}
        {(currentPage === "customer-dashboard" || currentPage === "bookings") && (
          <CustomerDashboardView
            bookings={bookings}
            productOrders={productOrders}
            savedPosts={savedPosts}
            onNavigate={navigate}
            onOpenChatWithBeautician={(b) => setChatBeautician(b)}
          />
        )}

        {/* 2. DEDICATED BEAUTICIAN PRO PORTAL (Client Appointments & Hair/Beauty Requirements) */}
        {currentPage === "pro-dashboard" && (
          <ProDashboardView
            beauticians={beauticians}
            activeBeautician={activeProBeautician}
            onSelectBeautician={setActiveProBeautician}
            bookings={bookings}
            onUpdateBookingStatus={handleUpdateBookingStatus}
            onOpenStudio={() => setIsStudioOpen(true)}
            onNavigate={navigate}
          />
        )}

        {/* 3. DEDICATED SHOP OWNER PORTAL (List Products & Fulfill Orders) */}
        {currentPage === "shop-portal" && (
          <ShopOwnerPortalView
            products={products}
            productOrders={productOrders}
            onAddNewProduct={handleAddNewProduct}
            onDeleteProduct={handleDeleteProduct}
            onUpdateOrderStatus={handleUpdateOrderStatus}
          />
        )}

        {currentPage === "social" && (
          <SocialFeedView
            posts={posts}
            onLikePost={handleLikePost}
            onSavePost={handleSavePost}
            onAddComment={handleAddComment}
            onOpenCreatePost={() => setIsStudioOpen(true)}
            onOpenStudio={() => setIsStudioOpen(true)}
            onSelectBeauticianById={openBeauticianById}
          />
        )}

        {currentPage === "brands" && (
          <BrandsView
            brands={initialBrands}
            products={products}
            onBuyProduct={(prod) => setCheckoutProduct(prod)}
            onOpenShopPortal={() => navigate("shop-portal")}
          />
        )}

        {currentPage === "profile-me" && (
          <UserProfileView
            bookingsCount={bookings.length}
            savedPosts={savedPosts}
            onNavigate={navigate}
            onOpenBooking={() => navigate("customer-dashboard")}
          />
        )}
      </main>

      {/* Fixed Bottom Navigation for Mobile */}
      <BottomNav currentPage={currentPage} onNavigate={navigate} />

      {/* Role Switcher Modal */}
      {isRoleModalOpen && (
        <RoleSwitcherModal
          currentRole={currentRole}
          onSelectRole={(role) => {
            setCurrentRole(role);
            if (role === "customer") navigate("customer-dashboard");
            else if (role === "beautician") navigate("pro-dashboard");
            else if (role === "shop_owner") navigate("shop-portal");
          }}
          currentAccount={currentAccount}
          onOpenAccount={() => {
            setIsRoleModalOpen(false);
            setIsAccountModalOpen(true);
          }}
          onSignOut={() => {
            setCurrentAccount(null);
            setCurrentRole("customer");
            navigate("home");
          }}
          onClose={() => setIsRoleModalOpen(false)}
        />
      )}

      {isAccountModalOpen && (
        <AccountModal
          onSubmit={handleAccountSubmit}
          onClose={() => setIsAccountModalOpen(false)}
        />
      )}

      {/* Product Checkout Modal (100% Full Marketplace Payment) */}
      {checkoutProduct && (
        <ProductCheckoutModal
          product={checkoutProduct}
          onClose={() => setCheckoutProduct(null)}
          onOrderSuccess={handleOrderSuccess}
          currentCustomer={{ name: "Grace K." }}
        />
      )}

      {/* Camera & Video Recording Studio Modal */}
      {isStudioOpen && (
        <GlowStudioModal
          onClose={() => setIsStudioOpen(false)}
          onSubmitMediaPost={handlePublishMediaPost}
          currentBeautician={activeProBeautician}
        />
      )}

      {/* Direct In-App Beautician Consultation Chat Drawer */}
      {chatBeautician && (
        <ChatDrawer
          beautician={chatBeautician}
          onClose={() => setChatBeautician(null)}
        />
      )}
    </div>
  );
}
