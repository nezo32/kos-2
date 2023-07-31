import { AllowedComponentProps, VNodeProps } from "nuxt/dist/app/compat/capi";

export type PropsType<C extends Component> = C extends new (...args: any) => any
    ? Omit<InstanceType<C>['$props'], keyof VNodeProps | keyof AllowedComponentProps>
    : never;
