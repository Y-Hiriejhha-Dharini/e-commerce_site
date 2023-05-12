const Search = () => {
    return ( 
            <span >
                <input type="search" id="form1" className="search_input" placeholder="Search"/>
                <button type="button" className="btn btn-primary">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    {/* <img src="search_icon.png" alt="" /> */}
                </button> 
            </span>
     );
}

export default Search;