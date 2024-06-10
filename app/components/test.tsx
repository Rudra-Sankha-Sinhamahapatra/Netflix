interface testProps{
    className?:string
}

export const Test=({className}:testProps)=>{
    return(
        <>
        <h1 className={className}>Netflix</h1>
        </>
    )
}