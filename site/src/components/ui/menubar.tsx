import * as React from "react"
import * as MenubarPrimitive from "@radix-ui/react-menubar"
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Menubar(props: React.ComponentProps<typeof MenubarPrimitive.Root>) {
  return (
    <MenubarPrimitive.Root
      data-slot="menubar"
      className={cn("flex items-stretch bg-paper-dim", props.className)}
      {...props}
    />
  )
}

function MenubarPortal(props: React.ComponentProps<typeof MenubarPrimitive.Portal>) {
  return <MenubarPrimitive.Portal data-slot="menubar-portal" {...props} />
}

function MenubarMenu(props: React.ComponentProps<typeof MenubarPrimitive.Menu>) {
  return <MenubarPrimitive.Menu data-slot="menubar-menu" {...props} />
}

function MenubarGroup(props: React.ComponentProps<typeof MenubarPrimitive.Group>) {
  return <MenubarPrimitive.Group data-slot="menubar-group" {...props} />
}

function MenubarRadioGroup(props: React.ComponentProps<typeof MenubarPrimitive.RadioGroup>) {
  return <MenubarPrimitive.RadioGroup data-slot="menubar-radio-group" {...props} />
}

function MenubarTrigger({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Trigger>) {
  return (
    <MenubarPrimitive.Trigger
      data-slot="menubar-trigger"
      className={cn(
        "flex items-stretch border-ink px-4 font-mono text-[12px] uppercase tracking-widest text-ink",
        "cursor-pointer items-center data-[highlighted]:bg-ink data-[highlighted]:text-paper",
        "data-[state=open]:bg-ink data-[state=open]:text-paper",
        "outline-none focus-visible:bg-ink focus-visible:text-paper",
        className
      )}
      {...props}
    />
  )
}

function MenubarContent({
  className,
  align = "start",
  sideOffset = 0,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Content>) {
  return (
    <MenubarPortal>
      <MenubarPrimitive.Content
        data-slot="menubar-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "z-50 min-w-[12rem] origin-(--radix-menubar-content-transform-origin) m-0 border-2 border-ink bg-paper p-0 shadow-brutal",
          "max-h-(--radix-menubar-content-available-height) overflow-hidden",
          "data-[state=open]:animate-mac-in data-[state=closed]:animate-mac-out",
          className
        )}
        {...props}
      />
    </MenubarPortal>
  )
}

function MenubarItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Item> & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  return (
    <MenubarPrimitive.Item
      data-slot="menubar-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "relative flex cursor-pointer select-none items-center gap-2 border-b-2 border-ink bg-paper px-4 py-2.5 outline-none",
        "text-ink data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        "data-[highlighted]:bg-ink data-[highlighted]:text-paper",
        "focus-visible:bg-ink focus-visible:text-paper",
        "data-[variant=destructive]:text-siren data-[variant=destructive]:data-[highlighted]:bg-siren data-[variant=destructive]:data-[highlighted]:text-paper",
        "data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "last:border-b-0",
        className
      )}
      {...props}
    />
  )
}

function MenubarCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.CheckboxItem>) {
  return (
    <MenubarPrimitive.CheckboxItem
      data-slot="menubar-checkbox-item"
      className={cn(
        "relative flex cursor-pointer select-none items-center gap-2 border-b-2 border-ink bg-paper px-4 py-2.5 pl-8 outline-none",
        "text-ink data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        "data-[highlighted]:bg-ink data-[highlighted]:text-paper",
        "focus-visible:bg-ink focus-visible:text-paper",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="absolute left-2 flex size-4 items-center justify-center pointer-events-none">
        <MenubarPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.CheckboxItem>
  )
}

function MenubarRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioItem>) {
  return (
    <MenubarPrimitive.RadioItem
      data-slot="menubar-radio-item"
      className={cn(
        "relative flex cursor-pointer select-none items-center gap-2 border-b-2 border-ink bg-paper px-4 py-2.5 pl-8 outline-none",
        "text-ink data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        "data-[highlighted]:bg-ink data-[highlighted]:text-paper",
        "focus-visible:bg-ink focus-visible:text-paper",
        className
      )}
      {...props}
    >
      <span className="absolute left-2 flex size-4 items-center justify-center pointer-events-none">
        <MenubarPrimitive.ItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.RadioItem>
  )
}

function MenubarLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Label> & { inset?: boolean }) {
  return (
    <MenubarPrimitive.Label
      data-slot="menubar-label"
      data-inset={inset}
      className={cn(
        "bg-paper-dim px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/60",
        "data-[inset]:pl-8",
        className
      )}
      {...props}
    />
  )
}

function MenubarSub(props: React.ComponentProps<typeof MenubarPrimitive.Sub>) {
  return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />
}

function MenubarSubTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.SubTrigger>) {
  return (
    <MenubarPrimitive.SubTrigger
      data-slot="menubar-sub-trigger"
      className={cn(
        "flex cursor-pointer select-none items-center gap-2 bg-paper px-4 py-2.5 outline-none",
        "text-ink data-[state=open]:bg-ink data-[state=open]:text-paper",
        "data-[highlighted]:bg-ink data-[highlighted]:text-paper",
        "focus-visible:bg-ink focus-visible:text-paper [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto size-4" />
    </MenubarPrimitive.SubTrigger>
  )
}

function MenubarSubContent({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.SubContent>) {
  return (
    <MenubarPrimitive.SubContent
      data-slot="menubar-sub-content"
      className={cn(
        "z-50 min-w-[10rem] overflow-hidden m-0 border-2 border-ink bg-paper p-0 shadow-brutal",
        "data-[state=open]:animate-mac-in data-[state=closed]:animate-mac-out",
        className
      )}
      {...props}
    />
  )
}

function MenubarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Separator>) {
  return (
    <MenubarPrimitive.Separator
      data-slot="menubar-separator"
      className={cn("-mx-0 h-0 border-t-2 border-ink", className)}
      {...props}
    />
  )
}

export {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarPortal,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
}
