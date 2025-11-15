      <div style={{ marginBottom: 10 }}>
        <label
          style={{
            display: "block",
            fontSize: 13,
            fontWeight: 600,
            marginBottom: 4,
          }}
        >
          歯科国試の分野
        </label>
        <select
          value={editing.field ?? "その他"}
          onChange={(e) => handleChangeField(e.target.value as DentalField)}
          style={{
            borderRadius: 8,
            border: "1px solid #ddd",
            padding: "6px 8px",
            fontSize: 13,
          }}
        >
          {dentalFields.map((f) => (
            <option key={f.value} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>
      </div>