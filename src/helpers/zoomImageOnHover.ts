export default function zoomImageOnHover(direction: "enter" | "leave", id: string, translate = "translate(0px, 0px)") {
    let image = document.getElementById(id)
    if (image !== null) {
        if (direction === "enter") {
            image.style.transition = "all 125ms ease-in"
            image.style.transform = `scale(1.1) ${translate}`
        }
        else {
            image.style.transition = "all 125ms ease-out"
            image.style.transform = `scale(1) ${translate}`
        }
    }
}