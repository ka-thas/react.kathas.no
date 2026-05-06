import kaThasTitle from "../assets/images/ka-thas-title.webp";

function KaThasTitle() {
    return (
        <img 
            src={kaThasTitle} 
            alt="Ka Thas" 
            className="w-full max-w-md mx-auto object-contain md:object-cover aspect-[2386/1000]"
            fetchPriority="high"
            loading="eager"
            />
    )
}

export default KaThasTitle;