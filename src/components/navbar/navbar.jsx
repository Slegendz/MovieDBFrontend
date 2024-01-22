
const Navbar = ({ search, setSearch }) => {
  return (
    <div className="mb-3 flex items-center justify-between">
      <a href="#" className="py-3.5 text-lg uppercase">
        Movies Site
      </a>

      <div>
        <form
          id="form"
          onSubmit = {(e) => e.preventDefault()}
          role="search"
          className="flex h-11 w-80 items-center rounded-xl bg-[#151f30]"
        >
          <input
            type="search"
            id="query"
            name="search"
            placeholder="Search..."
            className="text-md h-full w-full rounded-xl bg-inherit px-3 py-1.5 text-white outline-none"
            value={search}
            onChange = {(e) => setSearch(e.target.value)}
          />
        </form>
      </div>
    </div>
  )
}

export default Navbar
