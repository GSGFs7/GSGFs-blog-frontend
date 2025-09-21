import NextImage from "next/image";
import NextLink from "next/link";
import { MDXComponents } from "next-mdx-remote-client";

const Link = (props: any) => {
  const { href, children, ...rest } = props;

  return (
    <NextLink href={href} rel="noopener noreferrer" target="_blank" {...rest}>
      {children}
    </NextLink>
  );
};

const Image = (props: any) => {
  const { src, alt, ...rest } = props;

  if (!src) {
    return null;
  }

  return (
    <NextImage
      alt={alt}
      className=""
      height={600}
      src={src}
      width={800}
      {...rest}
    />
  );
};

export const components: MDXComponents = { a: Link, img: Image };
