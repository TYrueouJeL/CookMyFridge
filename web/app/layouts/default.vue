<template>
    <div>
        <nav class="flex justify-center mt-6">
            <div
            class="flex items-center gap-10 px-8 py-4 
                    bg-white rounded-2xl shadow-lg
                    transition-all duration-300
                    hover:shadow-2xl hover:scale-[1.02]"
            >
                <p class="text-2xl font-mono font-bold">
                    CookMyFridge
                </p>

                <div class="flex gap-6">
                    <a
                    href="/"
                    class="relative text-gray-700 transition-colors duration-300
                            hover:text-green-600
                            after:content-[''] after:absolute after:left-0 after:-bottom-1
                            after:w-0 after:h-0.5 after:bg-green-600
                            after:transition-all after:duration-300
                            hover:after:w-full"
                    >
                    Accueil
                    </a>

                    <a
                    href="/recettes"
                    class="relative text-gray-700 transition-colors duration-300
                            hover:text-green-600
                            after:content-[''] after:absolute after:left-0 after:-bottom-1
                            after:w-0 after:h-0.5 after:bg-green-600
                            after:transition-all after:duration-300
                            hover:after:w-full"
                    >
                    Recettes
                    </a>
                </div>
            </div>
        </nav>

        <slot />
    </div>
</template>
