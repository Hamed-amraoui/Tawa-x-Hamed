const Footer = () => {
    return (
      <footer className="footer" style={{ position: "relative", bottom: "0", width: "100%" }}>
        <div className="footer__copyright">
          &copy; {new Date().getFullYear()} Tawa Digital Inc. All Rights Reserved.
        </div>
      </footer>
    );
  }
  
  export default Footer;