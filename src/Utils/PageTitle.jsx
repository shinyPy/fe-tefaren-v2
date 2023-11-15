import React, { useEffect } from "react";

function PageTitle({ title, children }) {
  useEffect(() => {
    document.title = `${title} - TEFAREN`;
  }, [title]);

  return <>{children}</>;
}

export default PageTitle;
