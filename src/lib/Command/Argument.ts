export default class Argument {
  public static ARGUMENT_OPTIONAL = 0;
  public static ARGUMENT_REQUIRED = 1;

  private _name: string;
  private _description: string;
  private _defaultValue: string;
  private _isRequired: boolean;

  constructor(
    name: string,
    description: string = '',
    options: number = Argument.ARGUMENT_OPTIONAL,
    defaultValue = null
  ) {
    this._name = name;
    this._description = description;
    // tslint:disable:no-bitwise
    this._isRequired = (options & Argument.ARGUMENT_REQUIRED) === Argument.ARGUMENT_REQUIRED;
    // tslint:enable
    this._defaultValue = defaultValue;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get defaultValue(): string {
    return this._defaultValue;
  }

  get isRequired(): boolean {
    return this._isRequired;
  }
}
