function Button({ href, variant = 'primary', className = '', children, ...props }) {
  const classes = `vs-btn vs-btn--${variant} ${className}`.trim()

  if (href) {
    return (
      <a className={classes} href={href} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} type="button" {...props}>
      {children}
    </button>
  )
}

export default Button
