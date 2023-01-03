<div class="min-h-screen flex">
	<div class="py-6 px-4 flex flex-col justify-between min-h-screen w-full sm:w-2/4">
		<header>
			<img alt="glue_logo" src="src/lib/assets/images/glue.png" class="h-14 w-14 mx-auto" />
		</header>

		<main>
			<slot />
		</main>

		<footer>
			<p class="text-sm text-center text-gray-500">
				<a href="/terms">Terms of Service</a>
				|
				<a href="/policy">Privacy Policy</a>
			</p>
		</footer>
	</div>

	<div class="w-2/4 hidden h-screen flex-1 sm:block">
		<img
			alt="side_image"
			src="https://images.unsplash.com/photo-1525498128493-380d1990a112?auto=format&fit=crop&w=500&q=60"
			class="w-full h-full object-cover"
		/>
	</div>
</div>
