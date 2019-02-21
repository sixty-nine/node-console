type OptionType = 'string' | 'boolean' | 'numeric';

export default class Option {
  public static OPTION_OPTIONAL = 0;
  public static OPTION_BOOLEAN  = 1;
  public static OPTION_NUMERIC  = 2;
  public static OPTION_REQUIRED = 4;

  private _name: string;
  private _description: string;
  private _type: OptionType;
  private _isRequired: boolean;
  private _defaultValue: string | boolean;

  constructor(
    name: string,
    description: string = '',
    options: number = Option.OPTION_OPTIONAL,
    defaultValue: string | boolean = null
  ) {
    this._name = name;
    this._description = description;
    // tslint:disable:no-bitwise
    this._type =
      (options & Option.OPTION_BOOLEAN) === Option.OPTION_BOOLEAN
        ? 'boolean'
        : (options & Option.OPTION_NUMERIC) === Option.OPTION_NUMERIC
          ? 'numeric'
          : 'string'
    ;
    this._isRequired = (options & Option.OPTION_REQUIRED) === Option.OPTION_REQUIRED;
    // tslint:enable
    this._defaultValue = defaultValue;
  }

  public get name(): string {
    return this._name;
  }

  public get description(): string {
    return this._description;
  }

  public get type(): OptionType {
    return this._type;
  }

  public get isRequired(): boolean {
    return this._isRequired;
  }

  public get defaultValue(): string | boolean {
    return this._defaultValue;
  }
}
