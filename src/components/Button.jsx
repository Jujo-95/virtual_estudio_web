function Button({
  as = 'button',
  href,
  onClick,
  variant = 'primary',
  children,
  type = 'button',
}) {
  const className = `vs-btn vs-btn--${variant}`

  if (as === 'a') {
    return (
      <a className={className} href={href} onClick={onClick}>
        {children}
      </a>
    )
  }

  return (
    <button className={className} type={type} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button

