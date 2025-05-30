

export default function Contact(){
    return (

      
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="mb-6">We’d love to hear from you. Please fill out the form below.</p>

      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-4 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-400"
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded px-4 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-400"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Message</label>
          <textarea
            className="w-full border border-gray-300 rounded px-4 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-400"
            rows={5}
            placeholder="Your message"
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Send Message
        </button>
      </form>
    </main>
    );
}