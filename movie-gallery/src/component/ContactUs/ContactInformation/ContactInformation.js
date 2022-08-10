const ContactInformation = () => {
  return (
    <section className="section-long">
      <div className="container">
        <div className="grid row">
          <div className="col-md-6">
            <h4 className="entity-title">Address</h4>
            <p className="entity-text">
              Hristo Botev 15, Sofia, Bulgaria
              <br /> Vasil Levski 12, Varna, Bulgaria
            </p>
          </div>
          <div className="col-md-6">
            <h4 className="entity-title">Phone</h4>
            <p className="entity-text">
              (+359) 888 411 621, (+359) 888 412 755
              <br />
              (+359) 885 441 525, (+359) 885 441 255
            </p>
          </div>
          <div className="col-md-6">
            <h4 className="entity-title">Email</h4>
            <p className="entity-text">
              moviegallery@abv.com
              <br />
              service-moviegallery@abv.com
            </p>
          </div>
          <div className="col-md-6">
            <h4 className="entity-title">Fax</h4>
            <p className="entity-text">
              (+88) 018 4113 6251, (+43) 018 4111 7255
              <br />
              (+50) 118 4341 5251, (+08) 123 567 7255
            </p>
          </div>
        </div>
        <p className="text-muted mt-5">
          If you have any questions or suggestions, we are always happy to hear
          from you. Contact us convenient for you.
        </p>
      </div>
    </section>
  );
};

export default ContactInformation;
