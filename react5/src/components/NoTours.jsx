// TODO:Implement click function 
export default function NoTours({refresh}){
    return (
        <div className='title'>
            <h2>no tours left</h2>
            <button className='btn' onClick={refresh}>
                refresh
            </button>
        </div>
    )
}