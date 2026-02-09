export default function Button({ children, textButton, className, ...props }) {
  let classes = textButton ? "text-button" : "button";

  if (className) {
    classes += " " + className;
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}