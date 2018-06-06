Gem::Specification.new do |spec|
	spec.name          = "heiswayi.nrird.com"
	spec.version       = "5"
	spec.authors       = ["Heiswayi Nrird"]
	spec.email         = ["hnrird@gmail.com"]

	spec.summary       = "Between coding and random stuffs"
	spec.homepage      = "https://heiswayi.nrird.com"
	spec.license       = "MIT"

	spec.metadata["plugin_type"] = "theme"

	spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r!^(assets|_layouts|_includes|_sass|(LICENSE|README)((\.(txt|md|markdown)|$)))!i) }

	spec.add_runtime_dependency "jekyll", "~> 3.5"

	spec.add_development_dependency "bundler", "~> 1.15"
	spec.add_development_dependency "rake", "~> 12.0"
end