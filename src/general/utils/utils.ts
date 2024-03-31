import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidatorOptions, registerDecorator } from "class-validator";

export function IsCpf(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'isCpf',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: CpfValidator,
        });
    };
}

@ValidatorConstraint({ async: false })
class CpfValidator implements ValidatorConstraintInterface {
    validate(cpf: string, args: ValidationArguments) {
        if (!cpf) return false;
        cpf = cpf.replace(/[^\d]+/g, '');
        if (cpf === '' || cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

        let soma = 0;
        for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        let resto = (soma * 10) % 11;

        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.substring(9, 10))) return false;

        soma = 0;
        for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        resto = (soma * 10) % 11;

        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.substring(10, 11))) return false;

        return true;
    }

    defaultMessage(args: ValidationArguments) {
        return 'CPF inválido.';
    }
}