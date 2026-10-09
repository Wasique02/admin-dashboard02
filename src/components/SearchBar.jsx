import { Search } from "lucide-react"

function SearchBar({ value, onChange, placeholder = "Search..." }) {
  return (
    <div className="search-bar">
      <Search size={18} className="search-icon" aria-hidden="true" />
      <input
        type="text"
        className="search-input"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label="Search"
      />
    </div>
  )
}

export default SearchBar
