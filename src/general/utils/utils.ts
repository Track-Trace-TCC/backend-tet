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


export function IsCnh(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'isCnh',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: CnhValidator,
        });
    };
}

@ValidatorConstraint({ async: false })
class CnhValidator implements ValidatorConstraintInterface {
    validate(cnh: string, args: ValidationArguments) {
        cnh = cnh.replace(/[^\d]+/g, '');
        if (cnh.length !== 11 || /^(\d)\1+$/.test(cnh)) return false;

        return true;
    }

    defaultMessage(args: ValidationArguments) {
        return 'CNH inválida.';
    }
}

export function generateTrackingCode(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 16; i++) {
        const randomValue = crypto.getRandomValues(new Uint8Array(1))[0];
        result += characters.charAt(randomValue % charactersLength);
    }
    return result;
}

export function haversineDistance(coords1: { lat: number, lng: number }, coords2: { lat: number, lng: number }) {
    const toRadian = (angle: number) => (Math.PI / 180) * angle;
    const earthRadius = 6371;

    const deltaLat = toRadian(coords2.lat - coords1.lat);
    const deltaLng = toRadian(coords2.lng - coords1.lng);

    const a =
        Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
        Math.cos(toRadian(coords1.lat)) * Math.cos(toRadian(coords2.lat)) *
        Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return earthRadius * c;
}

