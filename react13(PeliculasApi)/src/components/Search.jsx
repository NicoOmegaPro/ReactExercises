import styles from "./Search.module.css";
import { FaSearch } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";

export function Search(){
    const [query, setQuery] = useSearchParams();
    const search = query.get("search");

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return(
        <form className={styles.searchContainer} onSubmit={handleSubmit}>
            <div className={styles.searchBox}>
                <input 
                    className={styles.searchInput}
                    type="text"
                    placeholder="Title"
                    aria-label="Search Movies"
                    value={search ?? ""}
                    onChange={e =>{
                        setQuery({search:e.target.value});
                        // navigate("/?search=" + e.target.value); Si ho feim amb la API
                    }}
                />
                <FaSearch size={20} color="black" className={styles.searchButton}/>
            </div>
        </form>
    )

}