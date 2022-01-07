// @flow
import React from 'react';
import SVG from 'react-inlinesvg';

type Props = {
  src: any
};

export const SVGImage = ({ src, ...rest }: Props) => {
  return <SVG wrapper={React.createFactory('div')} src={src} {...rest} />;
};
