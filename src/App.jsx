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

import {
  initialBeauticians,
  initialPosts,
  initialBrands,
  initialBookings,
  initialProducts,
  initialProductOrders
} from "./data/mockData";

export default function App() {
  // Persistent Role & User State: 'customer' | 'beautician' | 'shop_owner'
  const [currentRole, setCurrentRole] = useState(() => {
    return localStorage.getItem("glow_current_role") || "customer";
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

  // Navigation & View State
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedBeautician, setSelectedBeautician] = useState(beauticians[0]);
  const [selectedService, setSelectedService] = useState(beauticians[0].services[0]);
  const [inProgressBooking, setInProgressBooking] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  // Beautician Pro Portal active persona
  const [activeProBeautician, setActiveProBeautician] = useState(beauticians[0]);

  // Modals & Drawers
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [isStudioOpen, setIsStudioOpen] = useState(false);
  const [chatBeautician, setChatBeautician] = useState(null);
  const [checkoutProduct, setCheckoutProduct] = useState(null);

  const navigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
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

  const handlePaymentSuccess = (paymentMeta) => {
    const finalBooking = {
      ...inProgressBooking,
      ...paymentMeta,
      status: "Confirmed"
    };

    setBookings((prev) => [finalBooking, ...prev]);
    setInProgressBooking(finalBooking);
    navigate("confirmation");
  };

  const handleCancelBooking = (bookingId) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status: "Cancelled" } : b))
      );
    }
  };

  // Beautician Pro Actions
  const handleUpdateBookingStatus = (bookingId, newStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
    );
  };

  // Shop Owner Actions (LISTING PRODUCTS & ORDERS)
  const handleAddNewProduct = (newProduct) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  const handleDeleteProduct = (productId) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setProductOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  // Customer Product Marketplace Purchase Handler (100% FULL PRODUCT PAYMENT)
  const handleOrderSuccess = (newOrder) => {
    setProductOrders((prev) => [newOrder, ...prev]);
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

  const handlePublishMediaPost = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);

    if (newPost.beauticianId) {
      setBeauticians((prev) =>
        prev.map((b) => {
          if (b.id === newPost.beauticianId) {
            const newWorkItem = {
              id: "w_" + Date.now(),
              title: newPost.serviceName || newPost.text.slice(0, 30),
              category: newPost.category,
              mediaType: newPost.mediaType,
              url: newPost.videoUrl || newPost.image,
              poster: newPost.image,
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
          onClose={() => setIsRoleModalOpen(false)}
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
