import React, { useEffect, useState } from "react";
const Leaderboard = ({ id }) => {


    const [users, setUsers] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {

        fetch(`http://localhost:3001/userList/?page=${currentPage}`)
            .then((res) => res.json())
            .then(data => {
                console.log(data);
                setUsers(data.users);
                //setCurrentPage(data.page);
                setTotalPages(data.pages)
                console.log(data)
            })

    }, [currentPage])

    const handleFindMe = () => {
        
    }



    return (
        <div className="Leaderboard">
            <div className="LeaderboardTable">
                <table>
                    <thead className="LeaderboardTable_Thead">
                        <tr>
                            <th>Name</th>
                            <th>Score</th>
                            <th>Rank</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.score}</td>
                                <td>{currentPage > 1 ? index + (currentPage * 10 - 10 + 1) : index + 1}</td>
                            </tr>)
                        )}
                    </tbody>
                </table>
                <div className="pagination">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button key={page} className={parseInt(currentPage) === page ? "active" : ""} onClick={() => setCurrentPage(page)}>{page}</button>
                    ))}
                    <button onClick={handleFindMe}>Find me</button>
                </div>
            </div>
        </div>
    )
}

export default Leaderboard;
