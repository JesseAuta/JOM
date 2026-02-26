import SearchBar from './components/SearchBar'; // adjust the path if needed

export default function Home() {
  return (
    <>{/* Add SearchBar component here */}
      <div className="mt-6">
        <SearchBar />
      </div>
    <div className="max-w-7xl mx-auto px-4 py-10">
    
      <h1 className="text-3xl font-bold">
        Welcome to Our Auto Repair Service
      </h1>
      <p className="mt-4 text-gray-600">
        Professional diagnostics, repairs, and maintenance.
      </p>

      
    </div>
    </>
  );
}