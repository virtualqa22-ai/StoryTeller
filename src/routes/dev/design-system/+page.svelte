<script lang="ts">
    import {
        Button,
        Badge,
        Spinner,
        Icon,
        Card,
        Input,
        Label,
        Textarea,
        Checkbox,
        Switch,
        Form,
        Select,
        Dialog,
        Tooltip,
        Header,
        Sidebar,
        Container,
    } from "$lib/components";
    import {
        Home,
        Settings,
        User,
        Bell,
        Search,
        Menu,
        X,
        Check,
        AlertCircle,
        Info,
    } from "lucide-svelte";

    // Demo state
    let checkboxChecked = $state(false);
    let switchChecked = $state(false);
    let inputValue = $state("");
    let textareaValue = $state("");
    let selectValue = $state("");
    let dialogOpen = $state(false);
    let sidebarCollapsed = $state(false);

    const selectOptions = [
        { value: "opt1", label: "Option 1" },
        { value: "opt2", label: "Option 2" },
        { value: "opt3", label: "Option 3", disabled: true },
        { value: "opt4", label: "Option 4" },
    ];
</script>

<div class="min-h-screen bg-background">
    <!-- Page Header -->
    <div class="border-b bg-muted/30 px-6 py-8">
        <h1 class="text-3xl font-bold">Design System Gallery</h1>
        <p class="mt-2 text-muted-foreground">
            Component library for StoryTeller - visual verification and
            interactive testing
        </p>
    </div>

    <Container size="xl" class="py-8">
        <!-- Typography Section -->
        <section class="mb-12">
            <h2 class="mb-6 border-b pb-2 text-2xl font-semibold">Typography</h2>
            <div class="space-y-4">
                <h1 class="text-4xl font-bold">Heading 1 (text-4xl)</h1>
                <h2 class="text-3xl font-semibold">Heading 2 (text-3xl)</h2>
                <h3 class="text-2xl font-semibold">Heading 3 (text-2xl)</h3>
                <h4 class="text-xl font-medium">Heading 4 (text-xl)</h4>
                <p class="text-base">Body text (text-base)</p>
                <p class="text-sm text-muted-foreground">
                    Muted text (text-sm text-muted-foreground)
                </p>
                <p class="text-xs">Small text (text-xs)</p>
            </div>
        </section>

        <!-- Colors Section -->
        <section class="mb-12">
            <h2 class="mb-6 border-b pb-2 text-2xl font-semibold">Colors</h2>
            <div class="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
                <div class="space-y-2">
                    <div
                        class="h-16 w-full rounded-md bg-background border"
                    ></div>
                    <p class="text-xs">background</p>
                </div>
                <div class="space-y-2">
                    <div class="h-16 w-full rounded-md bg-foreground"></div>
                    <p class="text-xs">foreground</p>
                </div>
                <div class="space-y-2">
                    <div class="h-16 w-full rounded-md bg-primary"></div>
                    <p class="text-xs">primary</p>
                </div>
                <div class="space-y-2">
                    <div class="h-16 w-full rounded-md bg-secondary"></div>
                    <p class="text-xs">secondary</p>
                </div>
                <div class="space-y-2">
                    <div class="h-16 w-full rounded-md bg-muted"></div>
                    <p class="text-xs">muted</p>
                </div>
                <div class="space-y-2">
                    <div class="h-16 w-full rounded-md bg-accent"></div>
                    <p class="text-xs">accent</p>
                </div>
                <div class="space-y-2">
                    <div class="h-16 w-full rounded-md bg-destructive"></div>
                    <p class="text-xs">destructive</p>
                </div>
                <div class="space-y-2">
                    <div class="h-16 w-full rounded-md border"></div>
                    <p class="text-xs">border</p>
                </div>
            </div>
        </section>

        <!-- Buttons Section -->
        <section class="mb-12">
            <h2 class="mb-6 border-b pb-2 text-2xl font-semibold">Buttons</h2>

            <h3 class="mb-4 text-lg font-medium">Variants</h3>
            <div class="mb-8 flex flex-wrap gap-4">
                <Button variant="default">Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
            </div>

            <h3 class="mb-4 text-lg font-medium">Sizes</h3>
            <div class="mb-8 flex flex-wrap items-center gap-4">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
                <Button size="icon"><Search class="h-4 w-4" /></Button>
            </div>

            <h3 class="mb-4 text-lg font-medium">States</h3>
            <div class="flex flex-wrap gap-4">
                <Button>Normal</Button>
                <Button disabled>Disabled</Button>
                <Button><Spinner class="mr-2 h-4 w-4" /> Loading</Button>
            </div>
        </section>

        <!-- Badges Section -->
        <section class="mb-12">
            <h2 class="mb-6 border-b pb-2 text-2xl font-semibold">Badges</h2>
            <div class="flex flex-wrap gap-4">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge variant="outline">Outline</Badge>
            </div>
        </section>

        <!-- Icons Section -->
        <section class="mb-12">
            <h2 class="mb-6 border-b pb-2 text-2xl font-semibold">Icons</h2>
            <div class="flex flex-wrap gap-6">
                <div class="flex flex-col items-center gap-2">
                    <Icon name={Home} />
                    <span class="text-xs">Home</span>
                </div>
                <div class="flex flex-col items-center gap-2">
                    <Icon name={Settings} />
                    <span class="text-xs">Settings</span>
                </div>
                <div class="flex flex-col items-center gap-2">
                    <Icon name={User} />
                    <span class="text-xs">User</span>
                </div>
                <div class="flex flex-col items-center gap-2">
                    <Icon name={Bell} />
                    <span class="text-xs">Bell</span>
                </div>
                <div class="flex flex-col items-center gap-2">
                    <Icon name={Search} />
                    <span class="text-xs">Search</span>
                </div>
            </div>
        </section>

        <!-- Spinner Section -->
        <section class="mb-12">
            <h2 class="mb-6 border-b pb-2 text-2xl font-semibold">
                Spinner / Loading
            </h2>
            <div class="flex flex-wrap items-center gap-6">
                <Spinner class="h-4 w-4" />
                <Spinner class="h-6 w-6" />
                <Spinner class="h-8 w-8" />
                <Spinner class="h-12 w-12 text-primary" />
            </div>
        </section>

        <!-- Cards Section -->
        <section class="mb-12">
            <h2 class="mb-6 border-b pb-2 text-2xl font-semibold">Cards</h2>
            <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card.Root>
                    <Card.Header>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Description>Card description text</Card.Description>
                    </Card.Header>
                    <Card.Content>
                        <p>Card content goes here. This is an example of body text.</p>
                    </Card.Content>
                    <Card.Footer>
                        <Button variant="outline" size="sm">Cancel</Button>
                        <Button size="sm">Save</Button>
                    </Card.Footer>
                </Card.Root>

                <Card.Root>
                    <Card.Header>
                        <Card.Title>Interactive Card</Card.Title>
                    </Card.Header>
                    <Card.Content>
                        <div class="space-y-4">
                            <Form.Item>
                                <Label>Name</Label>
                                <Input placeholder="Enter name..." />
                            </Form.Item>
                        </div>
                    </Card.Content>
                </Card.Root>

                <Card.Root class="border-destructive">
                    <Card.Header>
                        <Card.Title class="text-destructive">Error State</Card.Title>
                        <Card.Description>Something went wrong</Card.Description>
                    </Card.Header>
                    <Card.Content>
                        <p class="text-muted-foreground">
                            This card demonstrates an error state styling.
                        </p>
                    </Card.Content>
                </Card.Root>
            </div>
        </section>

        <!-- Form Inputs Section -->
        <section class="mb-12">
            <h2 class="mb-6 border-b pb-2 text-2xl font-semibold">
                Form Inputs
            </h2>

            <div class="grid gap-8 md:grid-cols-2">
                <div class="space-y-6">
                    <h3 class="text-lg font-medium">Text Inputs</h3>

                    <Form.Item>
                        <Label for="text-input">Text Input</Label>
                        <Input
                            id="text-input"
                            type="text"
                            placeholder="Enter text..."
                            bind:value={inputValue}
                        />
                        <Form.Description>
                            Current value: {inputValue || "(empty)"}
                        </Form.Description>
                    </Form.Item>

                    <Form.Item>
                        <Label for="email-input">Email Input</Label>
                        <Input
                            id="email-input"
                            type="email"
                            placeholder="email@example.com"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Label for="password-input">Password Input</Label>
                        <Input
                            id="password-input"
                            type="password"
                            placeholder="Enter password..."
                        />
                    </Form.Item>

                    <Form.Item>
                        <Label for="disabled-input">Disabled Input</Label>
                        <Input
                            id="disabled-input"
                            placeholder="Disabled..."
                            disabled
                        />
                    </Form.Item>
                </div>

                <div class="space-y-6">
                    <h3 class="text-lg font-medium">Textarea</h3>

                    <Form.Item>
                        <Label for="textarea">Textarea</Label>
                        <Textarea
                            id="textarea"
                            placeholder="Enter long text..."
                            bind:value={textareaValue}
                        />
                        <Form.Description>
                            Character count: {textareaValue.length}
                        </Form.Description>
                    </Form.Item>

                    <h3 class="mt-8 text-lg font-medium">Toggles</h3>

                    <Form.Item class="flex items-center gap-3">
                        <Checkbox
                            id="checkbox"
                            bind:checked={checkboxChecked}
                        />
                        <Label for="checkbox">
                            Checkbox ({checkboxChecked ? "checked" : "unchecked"})
                        </Label>
                    </Form.Item>

                    <Form.Item class="flex items-center gap-3">
                        <Switch id="switch" bind:checked={switchChecked} />
                        <Label for="switch">
                            Switch ({switchChecked ? "on" : "off"})
                        </Label>
                    </Form.Item>
                </div>
            </div>
        </section>

        <!-- Select Section -->
        <section class="mb-12">
            <h2 class="mb-6 border-b pb-2 text-2xl font-semibold">
                Select / Dropdown
            </h2>

            <div class="max-w-sm space-y-4">
                <Form.Item>
                    <Label>Select an option</Label>
                    <Select
                        options={selectOptions}
                        bind:value={selectValue}
                        placeholder="Choose..."
                    />
                    <Form.Description>
                        Selected: {selectValue || "(none)"}
                    </Form.Description>
                </Form.Item>

                <Form.Item>
                    <Label>Disabled Select</Label>
                    <Select
                        options={selectOptions}
                        disabled
                        placeholder="Disabled..."
                    />
                </Form.Item>
            </div>
        </section>

        <!-- Dialog Section -->
        <section class="mb-12">
            <h2 class="mb-6 border-b pb-2 text-2xl font-semibold">
                Dialog / Modal
            </h2>

            <Button onclick={() => (dialogOpen = true)}>Open Dialog</Button>

            <Dialog
                bind:open={dialogOpen}
                title="Example Dialog"
                description="This is a demonstration of the Dialog component with focus trap and portal rendering."
            >
                {#snippet children()}
                    <p>
                        This modal demonstrates proper accessibility features including
                        focus trapping and keyboard navigation.
                    </p>
                    <Form.Item class="mt-4">
                        <Label>Input in Dialog</Label>
                        <Input placeholder="Type something..." />
                    </Form.Item>
                {/snippet}
                {#snippet footer()}
                    <Button variant="outline" onclick={() => (dialogOpen = false)}>
                        Cancel
                    </Button>
                    <Button onclick={() => (dialogOpen = false)}>Confirm</Button>
                {/snippet}
            </Dialog>
        </section>

        <!-- Tooltip Section -->
        <section class="mb-12">
            <h2 class="mb-6 border-b pb-2 text-2xl font-semibold">Tooltip</h2>

            <div class="flex flex-wrap gap-6">
                <Tooltip content="This is a tooltip on top" side="top">
                    {#snippet children()}
                        <Button variant="outline">Hover (Top)</Button>
                    {/snippet}
                </Tooltip>

                <Tooltip content="Tooltip on bottom" side="bottom">
                    {#snippet children()}
                        <Button variant="outline">Hover (Bottom)</Button>
                    {/snippet}
                </Tooltip>

                <Tooltip content="Tooltip on left" side="left">
                    {#snippet children()}
                        <Button variant="outline">Hover (Left)</Button>
                    {/snippet}
                </Tooltip>

                <Tooltip content="Tooltip on right" side="right">
                    {#snippet children()}
                        <Button variant="outline">Hover (Right)</Button>
                    {/snippet}
                </Tooltip>
            </div>
        </section>

        <!-- Layout Components Section -->
        <section class="mb-12">
            <h2 class="mb-6 border-b pb-2 text-2xl font-semibold">
                Layout Components
            </h2>

            <h3 class="mb-4 text-lg font-medium">Header</h3>
            <div class="mb-8 overflow-hidden rounded-lg border">
                <Header>
                    {#snippet left()}
                        <Button variant="ghost" size="icon">
                            <Menu class="h-5 w-5" />
                        </Button>
                        <span class="font-semibold">App Title</span>
                    {/snippet}
                    {#snippet right()}
                        <Button variant="ghost" size="icon">
                            <Bell class="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon">
                            <User class="h-5 w-5" />
                        </Button>
                    {/snippet}
                </Header>
            </div>

            <h3 class="mb-4 text-lg font-medium">Sidebar (Collapsible)</h3>
            <div class="mb-8 flex h-64 overflow-hidden rounded-lg border">
                <Sidebar bind:collapsed={sidebarCollapsed}>
                    {#if !sidebarCollapsed}
                        <nav class="space-y-2">
                            <button
                                type="button"
                                class="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left hover:bg-accent"
                            >
                                <Home class="h-4 w-4" />
                                <span>Home</span>
                            </button>
                            <button
                                type="button"
                                class="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left hover:bg-accent"
                            >
                                <Settings class="h-4 w-4" />
                                <span>Settings</span>
                            </button>
                        </nav>
                    {:else}
                        <nav class="flex flex-col items-center gap-2">
                            <button
                                type="button"
                                class="rounded-md p-2 hover:bg-accent"
                                title="Home"
                            >
                                <Home class="h-4 w-4" />
                            </button>
                            <button
                                type="button"
                                class="rounded-md p-2 hover:bg-accent"
                                title="Settings"
                            >
                                <Settings class="h-4 w-4" />
                            </button>
                        </nav>
                    {/if}
                </Sidebar>
                <div class="flex-1 p-4">
                    <p class="text-muted-foreground">
                        Main content area. Sidebar is {sidebarCollapsed
                            ? "collapsed"
                            : "expanded"}.
                    </p>
                </div>
            </div>

            <h3 class="mb-4 text-lg font-medium">Container Sizes</h3>
            <div class="space-y-4">
                <div class="rounded-lg border bg-muted/30 p-2">
                    <Container size="sm" class="bg-background rounded border py-4">
                        <p class="text-center text-sm">Container size="sm"</p>
                    </Container>
                </div>
                <div class="rounded-lg border bg-muted/30 p-2">
                    <Container size="md" class="bg-background rounded border py-4">
                        <p class="text-center text-sm">Container size="md"</p>
                    </Container>
                </div>
                <div class="rounded-lg border bg-muted/30 p-2">
                    <Container size="lg" class="bg-background rounded border py-4">
                        <p class="text-center text-sm">Container size="lg"</p>
                    </Container>
                </div>
            </div>
        </section>

        <!-- Feedback Section -->
        <section class="mb-12">
            <h2 class="mb-6 border-b pb-2 text-2xl font-semibold">Feedback</h2>

            <div class="grid gap-4 md:grid-cols-2">
                <Card.Root class="border-l-4 border-l-blue-500">
                    <Card.Content class="flex items-start gap-3 pt-6">
                        <Info class="h-5 w-5 text-blue-500" />
                        <div>
                            <p class="font-medium">Information</p>
                            <p class="text-sm text-muted-foreground">
                                This is an informational message.
                            </p>
                        </div>
                    </Card.Content>
                </Card.Root>

                <Card.Root class="border-l-4 border-l-green-500">
                    <Card.Content class="flex items-start gap-3 pt-6">
                        <Check class="h-5 w-5 text-green-500" />
                        <div>
                            <p class="font-medium">Success</p>
                            <p class="text-sm text-muted-foreground">
                                Operation completed successfully.
                            </p>
                        </div>
                    </Card.Content>
                </Card.Root>

                <Card.Root class="border-l-4 border-l-yellow-500">
                    <Card.Content class="flex items-start gap-3 pt-6">
                        <AlertCircle class="h-5 w-5 text-yellow-500" />
                        <div>
                            <p class="font-medium">Warning</p>
                            <p class="text-sm text-muted-foreground">
                                Please review before continuing.
                            </p>
                        </div>
                    </Card.Content>
                </Card.Root>

                <Card.Root class="border-l-4 border-l-destructive">
                    <Card.Content class="flex items-start gap-3 pt-6">
                        <X class="h-5 w-5 text-destructive" />
                        <div>
                            <p class="font-medium">Error</p>
                            <p class="text-sm text-muted-foreground">
                                Something went wrong. Please try again.
                            </p>
                        </div>
                    </Card.Content>
                </Card.Root>
            </div>
        </section>
    </Container>
</div>
