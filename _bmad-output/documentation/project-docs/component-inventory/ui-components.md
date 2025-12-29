# UI Components

## Layout Components

### Container
**Path:** `src/lib/components/ui/container/container.svelte`
**Purpose:** Main content wrapper with responsive max-width
**Props:**
- `class?: string` - Additional CSS classes
- `children?: Snippet | string` - Content to render

**Usage:**
```svelte
<Container>
  <!-- Your content here -->
</Container>
```

**Tests:** `src/lib/components/ui/container/container.test.ts`

---

### PageLayout
**Path:** `src/lib/components/ui/container/page-layout.svelte`
**Purpose:** Full-page layout wrapper with consistent padding and spacing
**Props:**
- `class?: string` - Additional CSS classes
- `children?: Snippet | string` - Page content

**Usage:**
```svelte
<PageLayout>
  <h1>Page Title</h1>
  <!-- Page content -->
</PageLayout>
```

**Tests:** Not yet implemented

---

### Header
**Path:** `src/lib/components/ui/header/header.svelte`
**Purpose:** Application header with navigation and branding
**Props:**
- `class?: string` - Additional CSS classes
- `children?: Snippet | string` - Header content

**Usage:**
```svelte
<Header>
  <!-- Logo, navigation, etc. -->
</Header>
```

**Tests:** `src/lib/components/ui/header/header.test.ts`

---

### Sidebar
**Path:** `src/lib/components/ui/sidebar/sidebar.svelte`
**Purpose:** Collapsible navigation sidebar
**Props:**
- `class?: string` - Additional CSS classes
- `children?: Snippet | string` - Sidebar content

**Usage:**
```svelte
<Sidebar>
  <!-- Navigation links -->
</Sidebar>
```

**Tests:** `src/lib/components/ui/sidebar/sidebar.test.ts`

---

## Interactive Components

### Button
**Path:** `src/lib/components/ui/button/button.svelte`
**Purpose:** Primary interactive button with multiple variants and sizes
**Props:**
- `class?: string` - Additional CSS classes
- `variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"` - Visual style (default: "default")
- `size?: "default" | "sm" | "lg" | "icon"` - Button size (default: "default")
- `children?: Snippet | string` - Button label/content
- `...rest` - All native button attributes (onclick, disabled, type, etc.)

**Variants:**
- `default` - Primary brand button (blue background)
- `destructive` - Danger/delete actions (red background)
- `outline` - Secondary action (bordered, transparent)
- `secondary` - Alternative action (gray background)
- `ghost` - Subtle action (no background until hover)
- `link` - Text link styled as button

**Usage:**
```svelte
<Button onclick={handleClick}>Click Me</Button>
<Button variant="destructive" size="sm">Delete</Button>
<Button variant="outline">Cancel</Button>
```

**Tests:** `src/lib/components/ui/button/button.test.ts`

---

### Input
**Path:** `src/lib/components/ui/input/input.svelte`
**Purpose:** Text input field with validation support
**Props:**
- `class?: string` - Additional CSS classes
- `type?: string` - Input type (text, password, email, etc.)
- `value?: string` - Input value
- `placeholder?: string` - Placeholder text
- `disabled?: boolean` - Disabled state
- `...rest` - All native input attributes

**Usage:**
```svelte
<Input type="text" placeholder="Enter title" bind:value={title} />
<Input type="email" placeholder="your@email.com" />
```

**Tests:** `src/lib/components/ui/input/input.test.ts`

---

### Textarea
**Path:** `src/lib/components/ui/textarea/textarea.svelte`
**Purpose:** Multi-line text input
**Props:**
- `class?: string` - Additional CSS classes
- `value?: string` - Textarea value
- `placeholder?: string` - Placeholder text
- `rows?: number` - Number of visible rows
- `disabled?: boolean` - Disabled state
- `...rest` - All native textarea attributes

**Usage:**
```svelte
<Textarea placeholder="Enter description" rows={5} bind:value={description} />
```

**Tests:** `src/lib/components/ui/textarea/textarea.test.ts`

---

### Switch
**Path:** `src/lib/components/ui/switch/switch.svelte`
**Purpose:** Toggle switch for boolean values
**Props:**
- `class?: string` - Additional CSS classes
- `checked?: boolean` - Checked state
- `disabled?: boolean` - Disabled state
- `onchange?: (checked: boolean) => void` - Change handler

**Usage:**
```svelte
<Switch bind:checked={isDarkMode} />
<Switch checked={true} disabled />
```

**Tests:** `src/lib/components/ui/switch/switch.test.ts`

---

### Checkbox
**Path:** `src/lib/components/ui/checkbox/checkbox.svelte`
**Purpose:** Checkbox input for boolean selections
**Props:**
- `class?: string` - Additional CSS classes
- `checked?: boolean` - Checked state
- `disabled?: boolean` - Disabled state
- `...rest` - All native checkbox attributes

**Usage:**
```svelte
<Checkbox bind:checked={agreedToTerms} />
```

**Tests:** `src/lib/components/ui/checkbox/checkbox.test.ts`

---

### Select
**Path:** `src/lib/components/ui/select/select.svelte`
**Purpose:** Dropdown selection input
**Props:**
- `class?: string` - Additional CSS classes
- `value?: string` - Selected value
- `options?: Array<{value: string, label: string}>` - Select options
- `placeholder?: string` - Placeholder text
- `disabled?: boolean` - Disabled state

**Usage:**
```svelte
<Select
  options={[
    {value: 'thriller', label: 'Thriller'},
    {value: 'romance', label: 'Romance'}
  ]}
  bind:value={genre}
/>
```

**Tests:** `src/lib/components/ui/select/select.test.ts`

---

## Display Components

### Card
**Path:** `src/lib/components/ui/card/card.svelte`
**Purpose:** Container with border, background, and shadow
**Props:**
- `class?: string` - Additional CSS classes
- `children?: Snippet | string` - Card content

**Usage:**
```svelte
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content here</CardContent>
</Card>
```

**Tests:** `src/lib/components/ui/card/card.test.ts`

---

### CardHeader
**Path:** `src/lib/components/ui/card/card-header.svelte`
**Purpose:** Top section of a card with padding
**Props:**
- `class?: string` - Additional CSS classes
- `children?: Snippet | string` - Header content

**Usage:**
```svelte
<CardHeader>
  <CardTitle>My Card</CardTitle>
  <CardDescription>Card subtitle</CardDescription>
</CardHeader>
```

**Tests:** Tested as part of Card component

---

### CardTitle
**Path:** `src/lib/components/ui/card/card-title.svelte`
**Purpose:** Main heading within a card header
**Props:**
- `class?: string` - Additional CSS classes
- `children?: Snippet | string` - Title text

**Usage:**
```svelte
<CardTitle>Project Name</CardTitle>
```

**Tests:** Tested as part of Card component

---

### CardDescription
**Path:** `src/lib/components/ui/card/card-description.svelte`
**Purpose:** Subtitle or description within a card header
**Props:**
- `class?: string` - Additional CSS classes
- `children?: Snippet | string` - Description text

**Usage:**
```svelte
<CardDescription>A brief summary</CardDescription>
```

**Tests:** Tested as part of Card component

---

### CardContent
**Path:** `src/lib/components/ui/card/card-content.svelte`
**Purpose:** Main content area of a card
**Props:**
- `class?: string` - Additional CSS classes
- `children?: Snippet | string` - Content

**Usage:**
```svelte
<CardContent>
  <p>Main card content goes here</p>
</CardContent>
```

**Tests:** Tested as part of Card component

---

### CardFooter
**Path:** `src/lib/components/ui/card/card-footer.svelte`
**Purpose:** Bottom section of a card (actions, metadata)
**Props:**
- `class?: string` - Additional CSS classes
- `children?: Snippet | string` - Footer content

**Usage:**
```svelte
<CardFooter>
  <Button>Action</Button>
</CardFooter>
```

**Tests:** Tested as part of Card component

---

### Badge
**Path:** `src/lib/components/ui/badge/badge.svelte`
**Purpose:** Small label for categories, status, or counts
**Props:**
- `class?: string` - Additional CSS classes
- `variant?: "default" | "secondary" | "destructive" | "outline"` - Visual style
- `children?: Snippet | string` - Badge text

**Usage:**
```svelte
<Badge>New</Badge>
<Badge variant="destructive">Error</Badge>
<Badge variant="secondary">Draft</Badge>
```

**Tests:** `src/lib/components/ui/badge/badge.test.ts`

---

### Spinner
**Path:** `src/lib/components/ui/spinner/spinner.svelte`
**Purpose:** Loading indicator
**Props:**
- `class?: string` - Additional CSS classes
- `size?: "sm" | "md" | "lg"` - Spinner size

**Usage:**
```svelte
<Spinner />
<Spinner size="lg" />
```

**Tests:** `src/lib/components/ui/spinner/spinner.test.ts`

---

### Icon
**Path:** `src/lib/components/ui/icon/icon.svelte`
**Purpose:** Wrapper for Lucide icons
**Props:**
- `class?: string` - Additional CSS classes
- `name: string` - Lucide icon name
- `size?: number` - Icon size in pixels

**Usage:**
```svelte
<Icon name="heart" size={24} />
<Icon name="trash" class="text-red-500" />
```

**Tests:** `src/lib/components/ui/icon/icon.test.ts`

---

### Tooltip
**Path:** `src/lib/components/ui/tooltip/tooltip.svelte`
**Purpose:** Hover tooltip for contextual information
**Props:**
- `class?: string` - Additional CSS classes
- `text: string` - Tooltip content
- `children?: Snippet` - Element to attach tooltip to

**Usage:**
```svelte
<Tooltip text="Delete project">
  <Button variant="ghost" size="icon">🗑️</Button>
</Tooltip>
```

**Tests:** `src/lib/components/ui/tooltip/tooltip.test.ts`

---

## Form Components

### FormItem
**Path:** `src/lib/components/ui/form/form-item.svelte`
**Purpose:** Container for a form field with label and validation
**Props:**
- `class?: string` - Additional CSS classes
- `children?: Snippet` - Form field content

**Usage:**
```svelte
<FormItem>
  <Label>Project Title</Label>
  <Input bind:value={title} />
  <FormMessage error={titleError} />
</FormItem>
```

**Tests:** `src/lib/components/ui/form/form-item.test.ts`

---

### FormDescription
**Path:** `src/lib/components/ui/form/form-description.svelte`
**Purpose:** Helper text for form fields
**Props:**
- `class?: string` - Additional CSS classes
- `children?: Snippet | string` - Description text

**Usage:**
```svelte
<FormDescription>Enter a unique title for your project</FormDescription>
```

**Tests:** Tested as part of FormItem

---

### FormMessage
**Path:** `src/lib/components/ui/form/form-message.svelte`
**Purpose:** Validation error message display
**Props:**
- `class?: string` - Additional CSS classes
- `error?: string` - Error message to display
- `children?: Snippet | string` - Message content

**Usage:**
```svelte
<FormMessage error={validationError} />
```

**Tests:** Tested as part of FormItem

---

### Label
**Path:** `src/lib/components/ui/label/label.svelte`
**Purpose:** Form field label
**Props:**
- `class?: string` - Additional CSS classes
- `for?: string` - Associated input ID
- `children?: Snippet | string` - Label text

**Usage:**
```svelte
<Label for="project-title">Project Title</Label>
<Input id="project-title" bind:value={title} />
```

**Tests:** `src/lib/components/ui/label/label.test.ts`

---

## Modal Components

### Dialog
**Path:** `src/lib/components/ui/dialog/dialog.svelte`
**Purpose:** Modal dialog overlay
**Props:**
- `class?: string` - Additional CSS classes
- `open?: boolean` - Dialog open state
- `onclose?: () => void` - Close handler
- `children?: Snippet` - Dialog content

**Usage:**
```svelte
<Dialog bind:open={isDialogOpen}>
  <h2>Confirm Delete</h2>
  <p>Are you sure?</p>
  <Button onclick={() => isDialogOpen = false}>Cancel</Button>
</Dialog>
```

**Tests:** `src/lib/components/ui/dialog/dialog.test.ts`

---

### DialogTrigger
**Path:** `src/lib/components/ui/dialog/dialog-trigger.svelte`
**Purpose:** Button that opens a dialog
**Props:**
- `class?: string` - Additional CSS classes
- `children?: Snippet` - Trigger button content

**Usage:**
```svelte
<DialogTrigger>
  <Button>Open Dialog</Button>
</DialogTrigger>
```

**Tests:** Tested as part of Dialog component

---
