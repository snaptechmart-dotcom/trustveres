export default function TrustedBy() {
  const logos = [
    "/logo1.png",
    "/logo2.png",
    "/logo3.png",
    "/logo4.png",
    "/logo5.png",
  ];

  return (
    <section className="py-16 bg-[#00111F] text-center">
      <h2 className="text-2xl md:text-3xl font-bold text-white">
        Trusted by 500+ Businesses
      </h2>
      <p className="text-gray-400 mt-2">
        Companies across industries rely on Trustverse AI
      </p>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mt-10 px-6 max-w-6xl mx-auto">
        {logos.map((logo, index) => (
          <img
            key={index}
            src={logo}
            className="opacity-70 hover:opacity-100 transition w-32 mx-auto"
          />
        ))}
      </div>
    </section>
  );
}
