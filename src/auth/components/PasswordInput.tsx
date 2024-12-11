import React, { useState } from 'react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';

export const PasswordInput = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>
  (({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState<boolean>(false)

    return (
      <div className="relative">
        <Input
          id="password"
          placeholder="*********"
          type={showPassword ? "text" : "password"}
          className={className}
          ref={ref}
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={() => setShowPassword(!showPassword)}
        >
          {
            showPassword 
              ? <Icons.EyeOff className="h-4 w-4 text-gray-500" />
              :  <Icons.Eye className="h-4 w-4 text-gray-500" />
          }
          <span className="sr-only">
            {showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
          </span>
        </Button>
      </div>
    );
  }
);
