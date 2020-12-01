export const environment = {
  production: true
};

export const regex={
  validate_email:/\S+@\S+\.\S+/,
  validate_cell_phone:/(9)[0-9]{9}/,
  validate_password:/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/,
};