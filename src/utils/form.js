export const getFieldState = (fields) => {
  let state = {};
  for (const field of fields) {
    if (field.kind === "gp") {
      for (const child of field.child) {
        const value = field.value ? field.vale : "";
        state[child.name] = value;
      }
    } else {
      const value = field.value ? field.vale : "";
      state[field.name] = value;
    }
  }
  return state;
};

export const getKindString = (kind) => {
  // "ta" | "ti" | "so" | "gp"
  switch (kind) {
    case "ti":
      return "Text Input";
    case "ta":
      return "Text Area";
    case "so":
      return "Select Option";
    case "so2":
      return "Select Option 2";
    case "sa2":
      return "Select Ajax 2";
    case "gp":
      return "Group";
  }
};

export const convertSectionToArray = (sections) => {
  let result = [];
  for (const s of sections) {
    let _fields = convertFieldToArray(s.fields);
    let _sectionArray = [s.id, s.title, s.description, _fields];

    result.push(_sectionArray);
  }
  return result;
};

export function arrayToSection(sections) {
  let result = []
  if(!sections) {
    return result
  }
  for(const s of sections) {
    const [id, title, description, _fields] = s
    const fields = arrayToFields(_fields)
    result.push({id, title, description, fields})
  }
  return result
}

export function convertFieldToArray(fields) {
  let result = [];
  for (const f of fields) {
    if(f.kind === 'col') {
      continue;
    }
    if(f.kind === 'gp') {
      result.push([
        f.kind,
        f.type,
        f.id,
        convertFieldToArray(f.child),
      ]);
    } else {
      result.push([
        f.kind,
        f.name,
        f.label,
        f.type,
        f.placeholder,
        f.options,
        f.child,
      ]);
    }
  }

  return result;
}

export function arrayToFields(fields) {
  let result = []
  
  for(const f of fields) {
    if(f[0] === 'gp') {
      const [kind, type, id, _child] = f;
      const child = arrayToFields(_child)
      result.push({kind, type, id, child})
    } else {
      const [kind, name, label, type, placeholder, options, child] = f;
      result.push({kind, name, label, type, placeholder, options, child})
    }
  }
  return result
}
