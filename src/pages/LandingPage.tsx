import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen font-sans">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-4xl font-bold text-green-700">Mentor Match</h1>
          <nav className="space-x-6 text-l font-semibold">
            <a href="#about" className="hover:text-green-600">About</a>
            <a href="#contact" className="hover:text-green-600">Contact</a>
            <Link to="/login" className="hover:text-green-600">Log in</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section with Background */}
      <section
        className="relative flex-grow flex flex-col items-center justify-center text-center py-20 px-4 min-h-[90vh] bg-cover bg-center"
        style={{ backgroundImage: "url('/background.jpg')" }}
        >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-40"></div>

        {/* Content */}
        <div className="relative z-10">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 max-w-2xl leading-tight">
            Find Your Perfect Mentor to Grow and Succeed
            </h2>
            <p className="text-white text-lg max-w-xl mb-8">
            Connect with professionals who can guide you through your career or personal development journey.
            </p>
            <Link
            to="/register"
            className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition duration-300"
            >
            Get Started
            </Link>
        </div>
        </section>

      {/* Mentors Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">Meet Our Mentors</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {[
              { name: 'Sophia Lee', role: 'UI/UX Designer', company: 'Creative Minds', image: 'https://randomuser.me/api/portraits/women/44.jpg' },
              { name: 'James Carter', role: 'Data Scientist', company: 'DataX', image: 'https://randomuser.me/api/portraits/men/22.jpg' },
              { name: 'Maria Garcia', role: 'Product Manager', company: 'Innovate Labs', image: 'https://randomuser.me/api/portraits/women/65.jpg' },
              { name: 'Liam Smith', role: 'Software Engineer', company: 'Techify', image: 'https://randomuser.me/api/portraits/men/34.jpg' },
              { name: 'Emily Johnson', role: 'Marketing Specialist', company: 'BrightMarket', image: 'https://randomuser.me/api/portraits/women/29.jpg' },
              { name: 'Noah Brown', role: 'Business Analyst', company: 'InsightCorp', image: 'https://randomuser.me/api/portraits/men/41.jpg' },
            ].map((mentor, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow hover:shadow-lg transition duration-300"
              >
                <img src={mentor.image} alt={mentor.name} className="w-20 h-20 rounded-full mx-auto mb-4 object-cover" />
                <h4 className="text-xl font-semibold text-gray-800 text-center">{mentor.name}</h4>
                <p className="text-sm text-gray-600 text-center">{mentor.role}</p>
                <p className="text-sm text-gray-500 text-center">{mentor.company}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-gray-100 py-16 px-6 text-center">
        <h4 className="text-2xl font-bold mb-4 text-gray-800">About Us</h4>
        <p className="max-w-3xl mx-auto text-gray-600">
          We connect learners with mentors who guide them toward success. Whether you're just starting or leveling up, our platform offers support every step of the way. We have industry professionals with a passion for helping others grow.
        </p>
      </section>

      {/* Contact & FAQ in one row */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 text-center md:text-left">
          {/* Contact Section */}
          <div id="contact">
            <h4 className="text-2xl font-bold mb-4 text-gray-800">Contact</h4>
            <p className="text-gray-600">
              +2348012345678, +2349012345678.
            </p>
            <p className="text-gray-600">
              Connect with us on social media.
            </p>
            <p className="text-gray-600">
              Support@mentormatchapp.com
            </p>
              
          </div>

          {/* FAQ Section */}
          <div>
            <h4 className="text-2xl font-bold mb-4 text-gray-800">FAQs</h4>
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-gray-700">How do I become a mentor?</p>
                <p className="text-gray-600 text-sm">Sign up and complete your profile, then apply via your dashboard.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700">Is the service free?</p>
                <p className="text-gray-600 text-sm">Yes, MentorMatch is completely free for both mentors and mentees.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-700 text-white text-center py-6 mt-10">
        <p className="text-sm">&copy; {new Date().getFullYear()} MentorMatch. All rights reserved.</p>
      </footer>
    </div>
  );
}