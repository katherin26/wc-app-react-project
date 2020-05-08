import React, { useState } from "react";

export default function Form(props) {
  const [unisex, setUnisex] = useState(false);
  const [accessible, setAccessible] = useState(false);
  const [changingTable, setChangingTable] = useState(false);

  return (
    <div class={props.showModal ? "modal is-active" : "modal"}>
      <div class="modal-background" />
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title ">
            {" "}
            <h1>{props.title}</h1>
          </p>
          <button
            class="delete"
            aria-label="close"
            onClick={() => props.handleClickOnBtn()}
          />
        </header>
        <section class="modal-card-body">
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Name of the place... "
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Street</label>
            <div className="control">
              <input
                className="input "
                type="text"
                placeholder="Exact Direction..."
              />
            </div>
          </div>

          <div className="field">
            <label className="label">City</label>
            <div className="control">
              <input className="input " type="text" placeholder="e.g Miami" />
            </div>
          </div>

          <div className="field">
            <label className="label">State/Province</label>
            <div className="control">
              <input className="input" type="text" placeholder="e.g FL" />
            </div>
          </div>

          <div className="field has-addons">
            <div className="control is-expanded">
              <div className="select is-fullwidth">
                <select name="country">
                  <option value="Argentina">Argentina</option>
                  <option value="Australia">Australia</option>
                  <option value="Brazil">Brazil</option>
                  <option value="China">China</option>
                  <option value="Colombia">Colombia</option>
                  <option value="Egypt">Egypt</option>
                  <option value="France">France</option>
                  <option value="Peru">Peru</option>
                  <option value="Philippinnes">Philippinnes</option>
                  <option value="Spain">Spain</option>
                  <option value="Uruguay">Uruguay</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="United States of America">
                    United States of America
                  </option>
                  <option value="Venezuela">Venezuela</option>
                </select>
              </div>
            </div>
            <div className="control">
              <button type="submit" className="button is-info">
                <span className="icon">
                  <i class="fas fa-globe" />
                </span>
              </button>
            </div>
          </div>

          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label ">Directions</label>
            </div>
            <div className="field-body">
              <div className="field">
                <div className="control">
                  <textarea
                    className="textarea"
                    placeholder="Add some directions or specs..."
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="field is-grouped has-addons has-addons-centered">
            <div className="control">
              <button
                className={unisex ? "button is-info" : "button"}
                onClick={() => setUnisex(unisex ? false : true)}
              >
                <span className="icon">
                  <span class="tooltiptext">Unisex</span>
                  <i className="fas fa-restroom" />
                </span>
              </button>
            </div>

            <div className="control">
              <button
                className={accessible ? "button is-info" : "button"}
                onClick={() => setAccessible(accessible ? false : true)}
              >
                <span className="icon">
                  <span class="tooltiptext">Accessible</span>
                  <i className="fas fa-wheelchair" />
                </span>
              </button>
            </div>

            <div className="control">
              <button
                className={changingTable ? "button is-info" : "button"}
                onClick={() => setChangingTable(changingTable ? false : true)}
              >
                <span className="icon">
                  <span class="tooltiptext">Changing Table</span>
                  <i className="fas fa-baby" />
                </span>
              </button>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button
            class="button is-info"
            onClick={() => props.handleClickOnBtn()}
          >
            <span className="icon ">
              <span className="tooltiptext">Submit</span>
              <i class="fas fa-check-double" />
            </span>
          </button>
          <button
            class="button is-link is-light"
            onClick={() => props.handleClickOnBtn()}
          >
            <span className="icon">
              {" "}
              <span className="tooltiptext">Cancel</span>
              <i class="fas fa-times" />
            </span>
          </button>
        </footer>
      </div>
    </div>
  );
}
