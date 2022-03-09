import styles from "./Button.module.scss";
import Link from "next/link";

/**
 * Determine if a given href attribute is a relative path.
 *
 * @param {string} href The href attribute to check.
 * @returns {boolean}
 */
export function isHrefRelative(href) {
  try {
    new URL(href);

    return false;
  } catch (err) {
    return true;
  }
}

/**
 * Conditionally wrap the button in a Next/Link component if the href prop is
 * relative.
 *
 * @param  {Props} props The props object.
 * @param  {string} props.href The href attribute.
 * @param  {React.ReactElement} props.children The content to be wrapped
 * @return {React.ReactElement} The children, possibly wrapped in <Link>.
 */
export function NextLinkWrapper({ href, children }) {
  if (isHrefRelative(href)) {
    return (
      <Link href={href} passHref>
        {children}
      </Link>
    );
  }

  return children;
}

/**
 * Render the Button component.
 *
 * @param  {Props} props The props object.
 * @param  {string} props.href Required: The href attribute.
 * @param  {primary|secondary} props.type The type of the button
 * @return {React.ReactElement} The Button component.
 */
export default function Button({ href, type = "primary", children }) {
  if (!href) {
    throw new Error("The href prop is required on the <Button /> component.");
  }

  const buttonType = type === "secondary" ? "secondary" : "primary";

  return (
    <NextLinkWrapper href={href}>
      <a
        href={href}
        className={[styles.button, styles[`btn-${buttonType}`]].join(" ")}
      >
        {children}
      </a>
    </NextLinkWrapper>
  );
}
